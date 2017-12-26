import React from 'react'
import ReactDOM from 'react-dom'
import IndexView from '../components/admin/products/IndexView.js.jsx'
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('products-admin-index')
  const data = JSON.parse(node.getAttribute('data'))
  console.log(data.products);
  ReactDOM.render(<IndexView products={data.products}/>, node)
})
