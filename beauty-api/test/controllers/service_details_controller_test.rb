require 'test_helper'

class ServiceDetailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @service_detail = service_details(:one)
  end

  test "should get index" do
    get service_details_url, as: :json
    assert_response :success
  end

  test "should create service_detail" do
    assert_difference('ServiceDetail.count') do
      post service_details_url, params: { service_detail: { description: @service_detail.description, price: @service_detail.price, profile_id: @service_detail.profile_id, service_id: @service_detail.service_id, time: @service_detail.time } }, as: :json
    end

    assert_response 201
  end

  test "should show service_detail" do
    get service_detail_url(@service_detail), as: :json
    assert_response :success
  end

  test "should update service_detail" do
    patch service_detail_url(@service_detail), params: { service_detail: { description: @service_detail.description, price: @service_detail.price, profile_id: @service_detail.profile_id, service_id: @service_detail.service_id, time: @service_detail.time } }, as: :json
    assert_response 200
  end

  test "should destroy service_detail" do
    assert_difference('ServiceDetail.count', -1) do
      delete service_detail_url(@service_detail), as: :json
    end

    assert_response 204
  end
end
