import React from 'react'
import ReactDOM from 'react-dom'
import ShowView from '../components/categories/ShowView.js.jsx'
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('products-index')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(<ShowView products={data.products} main_category_id={data.main_category_id} />, node)
})
