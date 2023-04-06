import React from "react";
import image from "./images/cbum.jpg"
import './Home_Page.css'

import { useState, useEffect, useRef } from 'react';
import FeedPage from "../components/FeedPage";
import {
    Link,
    Route,
    Routes,
    useNavigate,
    useLocation,
    Navigate
  } from "react-router-dom";

const Home_Page = (props) => {
    const navigate = useNavigate()


    return (
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light col-12">
                <a class="navbar-brand" href="#">Gym Blog</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                        <Link class="nav-item nav-link" to ="/profile">Profile</Link>
                        <Link class="nav-item nav-link" to ="/posts">Posts</Link>
                        <Link class="nav-item nav-link" to ="/register">Sign Up</Link>
                        <Link class="nav-item nav-link" to ="/login">Sign In</Link>
                        
                        </div>
                </div>
            </nav>
            <div class="card col-8 ml-auto mr-auto">
                <img src = {image}/>
            </div>

            <FeedPage/>

            

            



        </div>

        
        
    );
        

}


export default Home_Page;

