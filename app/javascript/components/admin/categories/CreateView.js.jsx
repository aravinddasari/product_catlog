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
      const cat_id = this.state.category_ids.value;
      const params = {
        name: this.state.name,
        parent_id: cat_id
      };
      console.log(params);
      $.ajax({
        type: "POST",
        data: params, 
        url: "/admin/categories",
        success: (data, textStatus, jqXHR) => {
          window.location.assign("/admin/categories")
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
              <input type="text" className="form-control" placeholder="Name of the Category" value = {this.state.name} onChange={this.updateFieldValue.bind(this, "name")} />
            </div>
          </div>
          <div className="form-group p-t-50">
            <label className="col-sm-2 col-form-label">Parent Category</label>
            <div className="col-sm-10">
              <Select
              closeOnSelect={true}
              onChange={this.handleSelectChange}
              options={this.state.category_list}
              placeholder="Select Categories"
              value={this.state.category_ids}
              />
            </div>
          </div> 
          <div className="form-group p-t-50">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit.bind(this)}>Add Category</button>
            </div>
          </div> 
        </form>
      </div>
    );
  }
}
