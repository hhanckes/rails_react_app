class ServiceDetailPhoto < ApplicationRecord
	belongs_to :service_detail
	mount_base64_uploader :photo, ServiceDetailPhotoUploader
end
