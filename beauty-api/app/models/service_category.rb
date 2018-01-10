class ServiceCategory < ApplicationRecord
	has_many :services
	has_many :profiles, through: :services
end
