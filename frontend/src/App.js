import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Update from './Update';
import Histo from './Histo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Create' element={<Create/>}></Route>
        <Route path='/Update/:numProduit' element={<Update/>}></Route>
        <Route path='/Histo' element={<Histo/>}></Route>
      </Routes>
    </BrowserRouter>
  ) 
}

export default App;
