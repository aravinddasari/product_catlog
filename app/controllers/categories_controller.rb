class CategoriesController < ApplicationController


  def show
    page = params[:page] || 1
    chunk_size = params[:per_page] || 10
    @main_category_id = params[:id]
    category = Category.find(@main_category_id)
    cat_ids = category.subtree_ids # get_all children cat ids 
    @products = []
    if params[:sub_filter].present?  # if subfilters applied
      all_cat = Category.where(:id => params["sub_filter"])
      cat_ids = []
      all_cat.each do |cat|
        cat_ids = cat_ids + cat.subtree_ids
      end
    end
    @products = Product.includes(:categories).where(categories: {:id => cat_ids})
    @products = @products.limit(chunk_size).offset((page.to_i - 1) * chunk_size.to_i)
    respond_to do |format|
      format.html do
        @products
      end
      format.json do
        render json: {products: @products}
      end
    end
  end

  def get_sub_categories
      all_cat = []
      if params["filter"].present?
        category = Category.find(params["filter"])
        all_cat = category.subtree.joins(:products).uniq
      end
      render json: {sub_categories: all_cat }
  end

  def get_main_categories
    main_categories = []
    categories = Category.where(:ancestry => nil)
    categories.each do |cat|
      main_categories  << cat if cat.subtree.joins(:products).length > 0
    end
    render json: {main_categories: main_categories}
  end

  def get_all_categories
    all_cat = []
    all_cat =  Category.all.select('name as label','id as value')
    render json: {all_categories: all_cat}
  end

end
