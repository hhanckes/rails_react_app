class Profile < ApplicationRecord
	has_many :service_details
	has_many :services, through: :service_details

	mount_base64_uploader :picture, PictureUploader
end
