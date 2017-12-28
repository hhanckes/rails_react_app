module Api::V1
  class ServiceDetailsController < ApplicationController
    before_action :set_service_detail, only: [:show, :update, :destroy]

    # GET /service_details
    def index
      @service_details = ServiceDetail.all

      render json: @service_details
    end

    # GET /service_details/1
    def show
      render json: @service_detail
    end

    # POST /service_details
    def create
      @service_detail = ServiceDetail.new(service_detail_params)

      if @service_detail.save
        render json: @service_detail, status: :created, location: @service_detail
      else
        render json: @service_detail.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /service_details/1
    def update
      if @service_detail.update(service_detail_params)
        render json: @service_detail
      else
        render json: @service_detail.errors, status: :unprocessable_entity
      end
    end

    # DELETE /service_details/1
    def destroy
      @service_detail.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_service_detail
        @service_detail = ServiceDetail.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def service_detail_params
        params.require(:service_detail).permit(:profile_id, :service_id, :description, :price, :time)
      end
  end
end