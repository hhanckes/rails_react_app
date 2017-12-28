class ServiceDetail < ApplicationRecord
	belongs_to :profile
	belongs_to :service

	mount_uploaders :photos, PhotoUploader
	serialize :photos, JSON # If you use SQLite, add this line.
end
