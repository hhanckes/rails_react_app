module Api::V1
  class ProfilesController < ApplicationController
    before_action :set_profile, only: [:show, :update, :destroy]
    before_action :set_service_category, only: [:show_for_service_category]
    before_action :set_service, only: [:show_for_service]

    # GET /profiles
    def index
      @profiles = Profile.order 'id DESC'

      render json: @profiles
    end

    # GET /profiles/1
    def show
      render json: @profile.to_json(include: { service_details: { include: [:service_detail_photos, :service] } })
    end

    def show_for_service_category
      render json: @service_category.profiles
    end

    def show_for_service
      render json: @service.profiles
    end

    # POST /profiles
    def create
      @profile = Profile.new(profile_params)

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
      def set_service
        @service = Service.find(params[:id])
      end
      def set_service_category
        @service_category = ServiceCategory.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def profile_params
        params.permit(:name, :brief, :restrictions, :picture, service_details_attributes: [:price, :description, :time, :service_id, service_detail_photos_attributes: [:photo]])
      end

  end
end