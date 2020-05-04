class Api::V1::FollowsController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
    end

end
