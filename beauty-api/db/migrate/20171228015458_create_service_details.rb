class CreateServiceDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :service_details do |t|
      t.integer :profile_id
      t.integer :service_id
      t.text :description
      t.float :price
      t.integer :time

      t.timestamps
    end
  end
end
