import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import $ from 'jquery';

export default class IndexView extends React.Component {
   constructor(props) {
    super(props);

    this.renderProducts = this.renderProducts.bind(this);
    this.renderProductCategories = this.renderProductCategories.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
  }

  redirectPage(value) {
    window.location.assign("/admin/products/new");
  }

  deleteProduct(product_id) {
    debugger;
    const data = {product_id: product_id}
    $.ajax({
      type: "GET", 
      url: "/admin/products/delete_product",
      data,
      success: (data, textStatus, jqXHR) => {
        window.location.assign("/admin/products");
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("errorrr");
      }
    })
  }

  renderProductCategories(categories) {
    const categoryHtml = [];
    let i;
    for(i=0; i < categories.length; i++) {
      categoryHtml.push(
        <a> {categories[i].name} </a>
      );
    }
    return categoryHtml;
  }

  renderProducts() {
    const rowsHtml = [];
    let i;
    let id;
    for(i=0; i < this.props.products.length; i++) {
      id= this.props.products[i].id;
      rowsHtml.push(
        <tr>
          <td> {this.props.products[i].name} </td>
          <td> {this.props.products[i].description} </td>
          <td> {this.props.products[i].price} </td>
          <td> {this.renderProductCategories(this.props.products[i].categories)} </td>
          <td> <a>Edit</a> &nbsp; <button type="button" onClick={() => this.deleteProduct(id)}>Delete</button> </td>
        </tr>
      );
    }
    return rowsHtml;
  }


  render() {
    return (
      <div className="container">
        <h2>List of All Products</h2>
        <div className="main-filter m-b-15 m-t-15">
          <div className="text-right m-r-15">
           <button type="button" onClick={() => this.redirectPage()} className="btn">
           <b>Add New product</b>
        </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name </th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderProducts()}
          </tbody>
        </table>
      </div>
    );
  }
}

IndexView.propTypes = {
  products: PropTypes.array
};