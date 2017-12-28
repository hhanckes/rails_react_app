class AddRestrictionsToProfile < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :restrictions, :text
  end
end
