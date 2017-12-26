import React from 'react';
import PropTypes from 'prop-types';
import ProductsCardComponent from '../products/ProductsCardComponent.js.jsx'
import Select from 'react-select';
import $ from 'jquery';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Pagination from "react-js-pagination";
//import {Checkbox} from 'react-btn-checkbox';

const PageList = [{label: 10,value: 10},{label: 50, value: 50},{label: 100, value:100}]


export default class ShowView extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      products: this.props.products,
      value: [],
      main_categories: [],
      sub_categories: [],
      filters: 0,
      sub_filters: [],
      activePage: 1,
      pageCount: PageList[0]
    };
    this.getMainCategories = this.getMainCategories.bind(this);
    this.getSubCategories = this.getSubCategories.bind(this);
    this.renderMainCategories = this.renderMainCategories.bind(this);
    this.renderSubCategories = this.renderSubCategories.bind(this);
    this.renderEachSub = this.renderEachSub.bind(this);
    this.renderEachCategory = this.renderEachCategory.bind(this);
    this.handleSubFilterChange = this.handleSubFilterChange.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = (value) => {
      console.log('You\'ve selected:', value);
      this.setState({pageCount: value });
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  handleSubFilterChange(value) {
    this.setState({sub_filters: value})
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

  renderEachSub(category) {
    const rowHtml = [];
    let index;
    for(index = 0 ;index < category["children"].length; index++) {
      rowHtml.push(
        <div>
        {category["children"][index]["name"]}
        <Checkbox value ={category["children"][index]["id"]} name={category["children"][index]["name"]} />
        </div>
      );
    }
    return rowHtml;
  }
  renderSubCategories() { //rendering upto level 1 of sub_categories
    const filterHtml = [];
    const total_cat = this.state.sub_categories.length;
    let i;
    for (i = 0; i < total_cat; i++) {
      if (this.state.sub_categories.length > 0) {
        filterHtml.push(
          <div id={i} key={i} className="m-t-15 m-b-15">
          {this.state.sub_categories[i]["name"]}
              <CheckboxGroup name={this.state.sub_categories[i]["name"]} value={this.state.sub_filters} onChange={this.handleSubFilterChange}>
              {this.renderEachSub(this.state.sub_categories[i])}
              </CheckboxGroup>
          </div>
        );
      }
    }
    return filterHtml;
  }

  getSubCategories() {
    const data = {filter: this.props.main_category_id}
    $.ajax({
      type: "GET", 
      url: "/categories/get_sub_categories",
      data,
      success: (data, textStatus, jqXHR) => {
        const cat = data.sub_categories;
        this.setState({
          sub_categories: cat
        });
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("errorrr");
      }
    })
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


  refreshProductsData(filter_params) {
    const data = {sub_filter: filter_params, page: this.state.activePage, per_page: this.state.pageCount.value }
    const url = "/categories/" + this.props.main_category_id + ".json"
    console.log(url);
    $.ajax({
      type: "GET", 
      url: url,
      data,
      success: (data, textStatus, jqXHR) => {
        console.log("refreshProductsData");
        console.log(data);
        const products = data.products;
        this.setState({
          products: products
        });
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("errorrr");
      }
    })
  }

  componentWillMount() {
    this.getMainCategories();
    this.getSubCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.sub_filters !== this.state.sub_filters) || (prevState.activePage !== this.state.activePage) || (prevState.pageCount !== this.state.pageCount)) {
      let filter_params = this.state.sub_filters;
      this.refreshProductsData(filter_params);
    }
  }

  render() {
    return (
      <div>
        <div className="header-products text-left">
          <h3 className="m-l-50">Sephora Products</h3>
        </div>
        <div className="main-filter">
          <div className="text-center">
            <div> <h4 style={{"color":"white"}}> Shop By Category </h4></div>
            <div className="btn-group">
              {this.renderMainCategories()}
            </div>
          </div>
        </div>
        <div className="container text-right">
          <div className="row">
            <div className="col-md-6"> </div>
            <div className="col-md-3" >
            <b>Per Page</b>
            <Select
              closeOnSelect={true}
              onChange={this.handleSelectChange}
              options={PageList}
              value={this.state.pageCount}  
            />
            </div>
           <div className="col-md-3">
           <Pagination
             activePage={this.state.activePage}
             itemsCountPerPage={this.state.pageCount.value}
             totalItemsCount={this.state.products.length}
             pageRangeDisplayed={3}
             onChange={this.handlePageChange}
           />
           </div>

            </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              {this.renderSubCategories()}
            </div>
            <div className="col-md-9">
              <ProductsCardComponent products={this.state.products} /> 
            </div>
          </div>
        </div>   
      </div>
    );
  }
}

ShowView.propTypes = {
  products: PropTypes.array,
  main_category_id: PropTypes.integer
};