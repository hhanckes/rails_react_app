module Api::V1
  class ProfilesController < ApplicationController
    before_action :set_profile, only: [:show, :update, :destroy]

    # GET /profiles
    def index
      @profiles = Profile.all

      render json: @profiles.to_json(include: :service_details)
    end

    # GET /profiles/1
    def show
      render json: @profile
    end

    # POST /profiles
    def create
      @profile = Profile.new(profile_params)
      @profile.service_details.build(service_detail_params)

      puts 'profile_params'
      puts profile_params
      puts 'service_detail_params'
      puts service_detail_params
      puts 'availability_params'
      puts availability_params

      if @profile.save
        render json: @profile, status: :created
      else
        render json: @profile.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /profiles/1
    def update
      if @profile.update(profile_params)
        render json: @profile
      else
        render json: @profile.errors, status: :unprocessable_entity
      end
    end

    # DELETE /profiles/1
    def destroy
      @profile.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_profile
        @profile = Profile.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def profile_params
        params.permit(:name, :brief, :restrictions, :picture)
      end

      def service_detail_params
        params.require(:services).map do |p|
          ActionController::Parameters.new(p).permit(:price, :time)
        end
      end

      def availability_params
        params.require(:availabilities)
      end
  end
end