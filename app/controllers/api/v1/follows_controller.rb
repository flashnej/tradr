class Api::V1::FollowsController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
    end

    def create
      follow = Follow.new(user: current_user, symbol: params["symbol"])
      if follow.save
        binding.pry
        render json: {follow: follow}
      else
        binding.pry
        render json: { follow: follow.errors.full_messages }, sttus: :unprocessable_entity
      end
    end

end
