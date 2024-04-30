

  import './App.css';
  import React  from 'react';

import Home from './Components/Home';
import Header from './Components/Header';
import {  Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

 




const App: React.FC = ()=> {

  
    return (
      <div className="App">
     
     <Header/>
        <Routes >
        <Route path="/"  element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
       
      </div>
   

      
     
     
    );
  }

  export default App;
