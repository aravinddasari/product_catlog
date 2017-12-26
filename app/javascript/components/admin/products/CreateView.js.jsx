import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import $ from 'jquery';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
//import {Checkbox} from 'react-btn-checkbox';


export default class CreateView extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      price: 0,
      category_ids: [],
      category_list: []
    };

    this.updateFieldValue = (value, event) => {
      const stateField = {}
      stateField[value] = event.target.value
      this.setState(stateField);
    }

    this.handleSelectChange = (value) => {
      console.log('You\'ve selected:', value);
      this.setState({category_ids: value });
    }

    this.getCategories = this.getCategories.bind(this);

    this.handleFormSubmit = (e) => {
      e.preventDefault();
      const cat_ids = [];
      let i;
      for(i=0; i<this.state.category_ids.length;i++) {
        cat_ids.push(this.state.category_ids[i].value);
      }
      const params = {
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        category_ids: cat_ids
      };
      console.log(params);
      $.ajax({
        type: "POST",
        data: params, 
        url: "/admin/products",
        success: (data, textStatus, jqXHR) => {
          window.location.assign("/admin/products")
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("errorrr");
        }
      })  
    }

  }

  getCategories() {
    $.ajax({
      type: "GET", 
      url: "/categories/get_all_categories",
      success: (data, textStatus, jqXHR) => {
        const cat = data.all_categories;
        this.setState({
          category_list: cat
        });
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("errorrr");
      }
    })
  }

  componentWillMount() {
    this.getCategories();
  }

  render() {
    return (
      <div className="container">
        <div className="main-filter m-b-15 m-t-15">
          <div className="text-center">
            <h4 style={{"color":"white"}}> Add New product</h4>
          </div>
        </div>
        <form>
          <div className="form-group p-t-50">
            <label className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" placeholder="Name of the Product" value = {this.state.name} onChange={this.updateFieldValue.bind(this, "name")} />
            </div>
          </div>
          <div className="form-group p-t-50">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" placeholder="Description of the Product" value = {this.state.description} onChange={this.updateFieldValue.bind(this, "description")} />
            </div>
          </div>
          <div className="form-group p-t-50">
            <label className="col-sm-2 col-form-label">Price</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" placeholder="in SGD" value = {this.state.price} onChange={this.updateFieldValue.bind(this, "price")} />
            </div>
          </div>
          <div className="form-group p-t-50">
            <label className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-10">
              <Select
              closeOnSelect={true}
              multi
              onChange={this.handleSelectChange}
              options={this.state.category_list}
              placeholder="Select Categories"
              removeSelected={true}
              value={this.state.category_ids}
              />
            </div>
          </div> 
          <div className="form-group p-t-50">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit.bind(this)}>Add Product</button>
            </div>
          </div> 
        </form>
      </div>
    );
  }
}
