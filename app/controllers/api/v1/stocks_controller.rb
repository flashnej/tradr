require 'faraday'

class Api::V1::StocksController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
      symbol = params[:id]
      secret_key = ENV["api_key"]


      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=#{secret_key}"
      api_response = Faraday.get(url)
      parsed_response = JSON.parse(api_response.body)


      render json: parsed_response["Time Series (Daily)"]["2020-05-04"]["4. close"]
    end


    # private
    #
    # av_api_key = "Z27SSUFZ4XXQKYV6"
end
