import './App.scss';
import SimpleSlider from './Slider';
import Header from './Header';
import Footer from './Footer';
import SearchForm from './Search';
import NewPost from './NewPost';
import SendQuest from './SendQuest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Product from './Product'
import Login from './Login';
import Admin from './Admin';
import {useEffect, useState} from "react"
import Products from './Admin/Product/Products';
import Blog from './Admin/Blog';
import Blogs from './Blogs';
import ViewBlog from './Blogs/ViewBlog';
import MailForm from './Mail';
import About from './About';
import Contact from './Contact';
import Conditions from './Conditions';
import Price from './Price';
import CreditAdvisor from './CreditAdvisor';
import RentSellProduct from './RentSellProduct';
import ReactGA from 'react-ga';
import React, {useContext} from "react";
import { AuthContext } from './helpers/AuthContext';
import { Helmet } from 'react-helmet';





function App() {
  const { state } = useContext(AuthContext);
  const TRACKING_ID = "G-GMQN9ZZJ8G";
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);


  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<><Header class='main'></Header><SimpleSlider></SimpleSlider><SearchForm action="sell"></SearchForm><NewPost></NewPost><SendQuest></SendQuest><Footer></Footer></>}/>
            <Route exact path="/products/:id" element={<><Header class='product'></Header><Product></Product><Footer></Footer></>}/>
            <Route exact path="/login" element={<Login></Login>}/>
            <Route exact path="/admin" element={<Admin></Admin>}/>
            <Route exact path="/productsTable" element={<><Products></Products></>}/>
            <Route exact path="/blog" element={<><Blog></Blog></>}/>
            <Route exact path='/strucni-tekstovi' element={<><Header class='product'></Header><Blogs></Blogs><Footer></Footer></>}></Route>
            <Route exact path='/strucni-tekst/:id' element={<><Header class='product'></Header><ViewBlog></ViewBlog><Footer></Footer></>}></Route>
            <Route exact path='/slanje-upita' element={<><Header class='product'></Header><MailForm></MailForm><Footer></Footer></>}></Route>
            <Route exact path='/o-nama' element={<><Header class='product'></Header><About></About><Footer></Footer></>}></Route>
            <Route exact path='/kontakt' element={<><Header class='product'></Header><Contact></Contact><Footer></Footer></>}></Route>
            <Route exact path='/opsti-uslovi' element={<><Header class='product'></Header><Conditions></Conditions><Footer></Footer></>}></Route>
            <Route exact path='/cenovnik' element={<><Header class='product'></Header><Price></Price><Footer></Footer></>}></Route>
            <Route exact path='/kreditni-savetnik' element={<><Header class='product'></Header><CreditAdvisor></CreditAdvisor><Footer></Footer></>}></Route>
            <Route exact path='/nekretnine' element={<><Header class='product'></Header><RentSellProduct></RentSellProduct><Footer></Footer></>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
