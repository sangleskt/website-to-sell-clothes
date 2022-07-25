/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import Blog from './Components/Blog';
import Detail from './Components/Blog/Detail';
import Index from './Components/Member';
import Home from './Components/Product/Home';
import DetailProduct from './Components/Product/DetailProduct';
import Cart from './Components/Product/Cart';
import Account from './Components/Member/Account';
import AddProduct from './Components/Product/AddProduct';
import MyProduct from './Components/Product/MyProduct';
import EditProduct from './Components/Product/EditProduct';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path='/login'element={<Index />}/>

        <Route path="/blog/list" element={<Blog />} />
        <Route path="/blog/detail/:id" element={<Detail />} />

        <Route path='/user/Account'element={<Account />}/>
        <Route path='/user/addProduct' element={<AddProduct/>}/>
        <Route path='/user/myProduct' element={<MyProduct/>}/>
        <Route path='/user/editProduct/:id' element={<EditProduct/>}/>
        
        <Route path='/product/detail/:id'element={<DetailProduct />}/>
        <Route path='/cart'element={<Cart />}/>
        

      </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
