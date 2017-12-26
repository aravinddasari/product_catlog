class Category < ActiveRecord::Base
  # for sub categories , sub-sub categories and so on
  has_ancestry

  # This is for many_to_many relationship between products and categories through product_category_maps model
  has_many :product_category_maps
  has_many :products, through: :product_category_maps
end