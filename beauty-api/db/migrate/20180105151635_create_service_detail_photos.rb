class CreateServiceDetailPhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :service_detail_photos do |t|
      t.integer :service_detail_id
      t.string :photo

      t.timestamps
    end
  end
end
