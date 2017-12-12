require 'test_helper'

class ServiceCategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @service_category = service_categories(:one)
  end

  test "should get index" do
    get service_categories_url, as: :json
    assert_response :success
  end

  test "should create service_category" do
    assert_difference('ServiceCategory.count') do
      post service_categories_url, params: { service_category: { description: @service_category.description, name: @service_category.name } }, as: :json
    end

    assert_response 201
  end

  test "should show service_category" do
    get service_category_url(@service_category), as: :json
    assert_response :success
  end

  test "should update service_category" do
    patch service_category_url(@service_category), params: { service_category: { description: @service_category.description, name: @service_category.name } }, as: :json
    assert_response 200
  end

  test "should destroy service_category" do
    assert_difference('ServiceCategory.count', -1) do
      delete service_category_url(@service_category), as: :json
    end

    assert_response 204
  end
end
