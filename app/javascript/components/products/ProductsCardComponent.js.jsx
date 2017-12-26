import React from 'react';
import PropTypes from 'prop-types';


export default class ProductsCardComponent extends React.Component {
    constructor(props) {
    super(props);

    this.renderProducts = () => {
      const productsHtml = [];
      let i;
      for(i=0; i < this.props.products.length; i++) {
        productsHtml.push(
          <div id={i} key={i} className="col-md-4 m-b-15 m-t-15">
            <div className="product-card">
              <div className="product-name">
              { this.props.products[i].name }
              </div>
              <div className="product-desc">
              { this.props.products[i].description }
              </div>
              <div className="product-price">
               Price : { this.props.products[i].price }
              </div>                            
            </div>
          </div>
        );
      }
      return productsHtml;
    }

  }

  render() {
    return (
      <div>
        { this.renderProducts() }
      </div>
    );
  }
}

ProductsCardComponent.propTypes = {
  products: PropTypes.array
}
