class ServiceDetail < ApplicationRecord
	belongs_to :profile
	belongs_to :service
	has_many :service_detail_photos
	
	accepts_nested_attributes_for :service_detail_photos
end
