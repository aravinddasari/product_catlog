import React from 'react'
import ReactDOM from 'react-dom'
import CreateView from '../components/admin/products/CreateView.js.jsx'
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('product-create-view-container')
  ReactDOM.render(<CreateView />, node)
})
