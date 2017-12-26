import React from 'react'
import ReactDOM from 'react-dom'
import WelcomeView from '../components/home/WelcomeView.js.jsx'
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('welcome-index')
  ReactDOM.render(<WelcomeView />, node)
})
