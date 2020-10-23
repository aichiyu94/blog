import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/nav'
import Main from './components/Main/home'
import Footer from './components/Footer/footer'

import { Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
