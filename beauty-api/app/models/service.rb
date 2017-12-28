class Service < ApplicationRecord
	has_many :service_details
	has_many :profiles, through: :service_details
	
	belongs_to :service_category
end
