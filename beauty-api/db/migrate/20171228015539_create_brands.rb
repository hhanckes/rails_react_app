class CreateBrands < ActiveRecord::Migration[5.1]
  def change
    create_table :brands do |t|
      t.integer :service_detail_id
      t.string :name

      t.timestamps
    end
  end
end
