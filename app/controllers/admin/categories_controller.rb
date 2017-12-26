class Admin::CategoriesController < ActionController::Base
  def index
    @categories = Category.where(:ancestry => nil)
  end

  def delete
  	category = Category.find(params[:id])
  	if category.destroy
  		render :index
  	end
  end
end
