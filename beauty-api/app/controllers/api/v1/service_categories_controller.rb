module Api::V1
  class ServiceCategoriesController < ApplicationController
    before_action :set_service_category, only: [:show, :update, :destroy]

    # GET /service_categories
    def index
      @service_categories = ServiceCategory.all

      render json: @service_categories.to_json(include: :services)
    end

    # GET /service_categories/1
    def show
      render json: @service_category
    end

    # POST /service_categories
    def create
      @service_category = ServiceCategory.new(service_category_params)

      if @service_category.save
        render json: @service_category, status: :created, location: @service_category
      else
        render json: @service_category.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /service_categories/1
    def update
      if @service_category.update(service_category_params)
        render json: @service_category
      else
        render json: @service_category.errors, status: :unprocessable_entity
      end
    end

    # DELETE /service_categories/1
    def destroy
      @service_category.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_service_category
        @service_category = ServiceCategory.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def service_category_params
        params.require(:service_category).permit(:name, :description)
      end
  end
end