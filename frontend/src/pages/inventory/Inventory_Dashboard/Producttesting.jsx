import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Header from '../../../components/inventory/Header/Header';
import ProductForm from '../../../components/inventory/ProductForm/ProductForm';
import AllProducts from '../../../components/inventory/AllProduct/AllProducts';


function Producttesting() {
  return (
    <>
      <div>
        <Header/>
      </div>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/addProduct" element={<ProductForm />} />
        <Route path="/allProducts" element={<AllProducts />}  />
      </Routes>
    </>
  );
}

export default Producttesting;
