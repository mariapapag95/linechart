
import React from 'react';
import { HashRouter } from "react-browser-router";
import Navbar from './components/Navbar'
// import UserInput from './components/UserInput'
import Routes from './components/Routes'
import './App.css';

function App() {
  return (
    <HashRouter>
    <div className="background">
    <div><Navbar/></div>
    <div className="flex-container">
    <Routes/>
    </div>
    </div>
    </HashRouter>
    
  );
}

export default App;
