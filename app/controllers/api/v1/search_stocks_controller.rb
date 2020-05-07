require 'faraday'

class Api::V1::SearchStocksController < ApplicationController

    def show
      fin_key=ENV["fin_api_key"]
      symbol = params[:id]
      api_response = Faraday.get("https://finnhub.io/api/v1/quote?symbol=#{symbol}&token=#{fin_key}")
      if api_response.body == "Symbol not supported"
        render json: {"error": "Company not found"}
      else
        parsed_response = JSON.parse(api_response.body)
        render json: parsed_response["c"]
      end
    end
end
