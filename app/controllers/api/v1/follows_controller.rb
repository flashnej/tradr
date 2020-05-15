require 'faraday'

class Api::V1::FollowsController < ApplicationController

    def index
      secret_key = ENV["av_api_key"]
      user = current_user
      data = []
      gameEnd = current_user.created_at + 2.months
      if gameEnd < Time.now
        gameOver = true
      else
        gameOver = false
      end
      user.follows.each do |follow|
        symbol = follow.symbol
        url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=#{secret_key}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)
        data << [follow.id, symbol, parsed_response]
      end

      render json: {
        data: data,
        balance: user.balance,
        gameOver: gameOver
      }
    end

    def create
      if current_user.follows.length >= 5
        render json: {error: "You are already following 5 companies"}
      else
        follow = Follow.new(user: current_user, symbol: params["symbol"])
        if follow.save
          render json: {follow: follow}
        else
          render json: { follow: follow.errors.full_messages }, sttus: :unprocessable_entity
        end
      end
    end

    # def show
    #   symbol = params[:id]
    #   secret_key = ENV["av_api_key"]
    #
    #   url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=#{secret_key}"
    #   api_response = Faraday.get(url)
    #   parsed_response = JSON.parse(api_response.body)
    #   if parsed_response["Error Message"]
    #     render json: parsed_response
    #   elsif parsed_response["Note"]
    #     render json: parsed_response
    #   else
    #     render json: parsed_response["Time Series (Daily)"]
    #   end
    # end

    def destroy
      follow = Follow.find(params["id"])
      follow.destroy
      render json: {}, status: :no_content
    end

    private

    def serialized_data(data, serializer)
      ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
    end

end
