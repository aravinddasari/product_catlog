class CreateProductCategoriesMap < ActiveRecord::Migration[5.0]
  def self.up
    create_table :product_category_maps do |t|
      t.integer :product_id
      t.integer :category_id
    end

    add_index :product_category_maps, [:product_id, :category_id]
  end

  def self.down
    drop_table :product_category_maps
  end
end
