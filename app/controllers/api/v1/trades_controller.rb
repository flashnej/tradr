require 'faraday'

class Api::V1::TradesController < ApplicationController

  def index
    fin_key=ENV["fin_api_key"]
    balance = current_user.balance
    trades = current_user.trades
    values = current_user.values
    current_trades = []
    trades.each do |trade|
      symbol = trade.symbol
      api_response = Faraday.get("https://finnhub.io/api/v1/quote?symbol=#{symbol}&token=#{fin_key}")
      parsed_response = JSON.parse(api_response.body)
      current_trades << [trade, parsed_response["c"]]
    end
    render json: {
      balance: balance,
      trades: current_trades,
      values: values
    }
  end

  def create
    buy_price=params["buy_price"][1..-1].to_f
    quantity = params["quantity"].to_f
    if current_user.balance - (buy_price * quantity) >= 0
      trade = Trade.new(user: current_user, symbol: params["symbol"], buy_price: buy_price, quantity: quantity)
      current_user.update(balance: current_user.balance - (buy_price * quantity))
      if trade.save
        render json: {trade: trade}
      else
        render json: { follow: follow.errors.full_messages }, sttus: :unprocessable_entity
      end
    else
      render json: {error: "Not ennough credit to purchase"}
    end
  end

  def update
    trade = Trade.find(params["id"])
    quantity = params["quantity"].to_i
    sell_price = params["sell_price"]
    trade.update(sell_price: sell_price, quantity: (trade.quantity - quantity))
    current_user.update(balance: current_user.balance + (sell_price * quantity))
    if trade.quantity = 0
      trade.destroy
    end
  end

end
