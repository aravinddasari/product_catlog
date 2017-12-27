# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
 	parent = Category.create(name: 'Bags')
  	sling_bags = Category.create(name: 'Sling bags', parent: parent)
  	backpacks = Category.create(name: 'Backpacks', parent: parent)

  	product = Product.create(name: 'Blue backPack', description: 'good quality', price: 45)
  	product.categories << backpacks

  	product = Product.create(name: 'brown backPack', description: 'good quality', price: 55)
  	product.categories << backpacks

  	product = Product.create(name: 'Blue sling', description: 'good quality', price: 35)
  	product.categories << sling_bags
 
  	parent = Category.create(name: 'Shoes')
  	casual_shoes = Category.create(name: 'Casual Shoes', parent: parent)
  	formal_shoes = Category.create(name: 'Formal Shoes', parent: parent)

  	product = Product.create(name: 'Blue shoes', description: 'good quality', price: 45)
  	product.categories << casual_shoes

  	product = Product.create(name: 'black formal', description: 'good quality', price: 55)
  	product.categories << formal_shoes

  	product = Product.create(name: 'browm casual_shoes', description: 'good quality', price: 35)
  	product.categories << casual_shoes

  	parent = Category.create(name: 'Shirts')
  	plain = Category.create(name: 'Plain Shirts', parent: parent)
  	checks = Category.create(name: 'check Shirts', parent: parent)

  	product = Product.create(name: 'Blue plain', description: 'good quality', price: 45)
  	product.categories << plain

  	product = Product.create(name: 'brown check', description: 'good quality', price: 55)
  	product.categories << checks

  	product = Product.create(name: 'Black check', description: 'good quality', price: 35)
  	product.categories << checks

  	parent = Category.create(name: 'Phants')
  	jeans = Category.create(name: 'jeans', parent: parent)
  	cargos = Category.create(name: 'cargos', parent: parent)

  	product = Product.create(name: 'Blue jeans', description: 'good quality', price: 45)
  	product.categories << jeans

  	product = Product.create(name: 'brown jeans', description: 'good quality', price: 55)
  	product.categories << jeans

  	product = Product.create(name: 'Blue cargos', description: 'good quality', price: 35)
  	product.categories << cargos

  	parent = Category.create(name: 'wallets')
  	plain = Category.create(name: 'leather', parent: parent)
  	checks = Category.create(name: 'normal', parent: parent)