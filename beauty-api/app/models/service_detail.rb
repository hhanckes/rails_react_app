class ServiceDetail < ApplicationRecord
	belongs_to :profile
	belongs_to :service

	mount_base64_uploader :photos, PhotoUploader
	serialize :photos, JSON # If you use SQLite, add this line.
end
