require 'faraday'

class Api::V1::StocksController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
      symbol = params[:id]
      secret_key = ENV["api_key"]
      date = Time.new.strftime("%Y-%m-%d")


      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=#{secret_key}"
      api_response = Faraday.get(url)
      parsed_response = JSON.parse(api_response.body)


      render json: parsed_response["Time Series (Daily)"][date]["4. close"]
    end
end
