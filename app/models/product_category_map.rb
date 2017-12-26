class ProductCategoryMap < ActiveRecord::Base
  # support model for product and category
  belongs_to :product
  belongs_to :category

end
