require 'faraday'

desc "This task is called by the Heroku scheduler add-on"
task :update_feed => :environment do
  puts "Updating feed..."
  today = Date.today
  time = Time.now
  range = Range.new(Time.local(time.year, time.month, time.day, 13, 30), Time.local(time.year, time.month, time.day, 20))
  if today.saturday? || today.sunday?
    puts "Markets are closed today."
  elsif range === time
    users = User.all
    users.each do |user|
      value = user.balance
      trades = user.trades
      trades.each do |trade|
        fin_key=ENV["fin_api_key"]
        symbol = trade.symbol
        api_response = Faraday.get("https://finnhub.io/api/v1/quote?symbol=#{symbol}&token=#{fin_key}")
        parsed_response = JSON.parse(api_response.body)
        value = value + (parsed_response["c"].to_f * trade.quantity)
      end
      value = Value.new(user: user, value: value)
      value.save
    end
    puts "Portfolio values updated."
  else
    puts "Markets are closed."
  end
end

task :send_reminders => :environment do
  User.send_reminders
end
