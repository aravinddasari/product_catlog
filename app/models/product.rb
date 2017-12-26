class Product < ActiveRecord::Base
  # This is for many_to_many relationship between products and categories through product_category_maps model
  has_many :product_category_maps
  has_many :categories, through: :product_category_maps
end
