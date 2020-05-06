require 'faraday'

class Api::V1::SearchStocksController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
      symbol = params[:id]
      secret_key = ENV["api_key"]
      date = Time.new-86400
      date = date.strftime("%Y-%m-%d")

      # need to write a conditional that determins if makets are open or closed

      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=#{secret_key}"
      api_response = Faraday.get(url)
      parsed_response = JSON.parse(api_response.body)

      if parsed_response["Error Message"]
        render json: parsed_response
      elsif parsed_response["Note"]
        render json: parsed_response
      else
        render json: parsed_response["Time Series (Daily)"][date]["4. close"]
      end
    end
end
