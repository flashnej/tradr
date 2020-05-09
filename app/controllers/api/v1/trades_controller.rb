class Api::V1::TradesController < ApplicationController

  def index
    user = current_user
    render json: user.trades
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

  def credit
  end

end
