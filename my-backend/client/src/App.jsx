import React from 'react'
import Navbar from "./components/Navbar"
import Prodaucts from "./pages/Products"
import ProductDetails from "./components/ProductDetails"
import {  Route, Routes  } from "react-router-dom";
import Dashbord from './pages/Dasbord';
import Login from "./pages/Login"
import { useSelector } from 'react-redux';


export default function App() {
  const {token}=useSelector(state=>state.auth)
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/products' element={<Prodaucts/>} />
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/dashbord' element={token? <Dashbord/>:<Login/>}/>
    </Routes>
    
    </>
  )
}
