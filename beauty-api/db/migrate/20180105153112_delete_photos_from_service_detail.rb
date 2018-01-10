class DeletePhotosFromServiceDetail < ActiveRecord::Migration[5.1]
  def change
    remove_column :service_details, :photos
  end
end
