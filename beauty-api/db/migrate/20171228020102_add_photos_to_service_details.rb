class AddPhotosToServiceDetails < ActiveRecord::Migration[5.1]
  def change
    add_column :service_details, :photos, :json
  end
end
