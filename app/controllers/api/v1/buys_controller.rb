class Api::V1::BuysController < ApplicationController

  def create
    price=params["price"][1..-1].to_f
    quantity = params["quantity"].to_f
    if current_user.balance - (price * quantity) >= 0
      buy = Buy.new(user: current_user, symbol: params["symbol"], buy_price: price, quantity: quantity)
      current_user.update(balance: current_user.balance - (price * quantity))
      if buy.save
        render json: {buy: buy}
      else
        render json: { follow: follow.errors.full_messages }, sttus: :unprocessable_entity
      end
    else
      render json: {error: "Not ennough credit to purchase"}
    end
  end

end
