class Admin::ProductsController < ApplicationController

  def index
    @products = Product.includes(:categories).all
    @products = @products.as_json(include: { categories: { only: [:name,:id]}})
  end

  def new; end

  def create
    product = Product.new(product_params)
    if params["category_ids"].present?
      params["category_ids"].each do |cat_id|
        product.categories << Category.find(cat_id)
      end
    end
    if product.save
      render json:{product: product}, status: :created
    else
      render json: product.errors, status: :unprocessable_entity
    end
  end

  def delete_product
    product = Product.find(params[:product_id])
    if product.present?
      product.destroy
      render json: { status: :success }
    else
      render json: product.errors, status: :unprocessable_entity
    end
  end

  def update
    product = Product.find(params[:id])
    product.update(product_params)
    product.categories.delete_all
    params["category_ids"].each do |cat_id|
      product.categories << Category.find(cat_id)
    end
    render json: {product: product}, status: :updated
  end

  private

  def product_params
    params.permit(:name, :description, :price)
  end
end
