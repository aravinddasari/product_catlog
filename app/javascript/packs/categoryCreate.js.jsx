import React from 'react'
import ReactDOM from 'react-dom'
import CreateView from '../components/admin/categories/CreateView.js.jsx'
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('category-create-view-container')
  ReactDOM.render(<CreateView />, node)
})
