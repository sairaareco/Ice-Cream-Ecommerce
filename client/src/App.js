import React from 'react';

import './App.css';
import NavBar from "./components/modules/NavBar";
import Faq from "./components/modules/Faq";
import Home from "./components/modules/Home";
import Init from "./components/modules/Init";
import IceCreamDetail from "./components/modules/IceCreamDet";
import Purchase from "./components/modules/Purchase";
import Contact from './components/modules/Contact';
// eslint-disable-next-line
import Cart from './components/modules/Cart';
import CartData from './components/modules/CartData';
import Payment from './components/modules/Payment';
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";


function App() {
  const location = useLocation();
  const hideMenu = location.pathname === "/";
  const [foundIceCreams, setFoundIceCreams] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);


  return (
    <div className="App">
      {!hideMenu && <NavBar setFoundIceCreams={setFoundIceCreams} setShowSearchResults={setShowSearchResults}/>}
      <Routes>  
        <Route path="/" element={<Init/>} />      
        <Route path="/faq" element={<Faq/>} />
        <Route path="/home" element={<Home foundIceCreams={foundIceCreams} showSearchResults={showSearchResults} setShowSearchResults={setShowSearchResults}/>} />
        <Route path="/icecream/:name" element={<IceCreamDetail/>} />
        <Route path="/purchase/:shoppingCartId" element={<Purchase/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<CartData/>}/>
        <Route path="/payment/:userId" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
