class Admin::CategoriesController < ActionController::Base
  layout "application", only: [:new]

  def index
    @categories = Category.where(:ancestry => nil)
  end

  def new; end

  def create
  	category = Category.new(category_params)
  	if params["parent_id"].present?
  		parent = Category.find(params["parent_id"])
  		category.parent = parent if parent.present?
  	end
  	if category.save
  	  render json:{category: category}, status: :created
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def delete
  	category = Category.find(params[:id])
  	if category.destroy
  		render :index
  	end
  end

  private

  def category_params
    params.permit(:name)
  end
end
