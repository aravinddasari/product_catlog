import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import $ from 'jquery';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
//import {Checkbox} from 'react-btn-checkbox';


export default class WelcomeView extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      main_categories: [],
    };
    this.getMainCategories = this.getMainCategories.bind(this);
    this.renderMainCategories = this.renderMainCategories.bind(this);
    this.renderEachCategory = this.renderEachCategory.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
  }

  redirectPage(value) {
    window.location.assign(`/categories/${value}`);
  }


  renderEachCategory(category) {
    return (
        <button type="button" onClick={() => this.redirectPage(category["id"])} className={"btn "+(this.state.filters === category["id"]  ? "active": "") }>
           <b>{category["name"]}</b>
        </button>
    )
  }

  renderMainCategories() {
    const mainHtml =[];
    const total_cat = this.state.main_categories.length;
    let i;
    for(i=0; i < total_cat; i++) {
      mainHtml.push(this.renderEachCategory(this.state.main_categories[i]));
    }
    return mainHtml;
  }

  getMainCategories() {
    $.ajax({
      type: "GET", 
      url: "/categories/get_main_categories",
      success: (data, textStatus, jqXHR) => {
        const cat = data.main_categories;
        this.setState({
          main_categories: cat
        });
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("errorrr");
      }
    })
  }



  componentWillMount() {
    this.getMainCategories();
  }

  render() {
    return (
      <div>
        <div className="header-products text-left">
          <h3 className="m-l-50">Product Catlog</h3>
        </div>
        <div className="main-filter align-items-center">
          <div className="text-center">
            <div> <h4 style={{"color":"white"}}> Shop By Category </h4></div>
            <div className="btn-group">
              {this.renderMainCategories()}
            </div>
          </div>
        </div>   
      </div>
    );
  }
}
