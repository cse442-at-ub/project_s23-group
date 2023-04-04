import React from "react";
import image from "./images/cbum.jpg"
import './Home_Page.css'
import Posts from "../components/FeedPage";
import { useState, useEffect, useRef } from 'react';
import FeedPage from "../components/FeedPage";


const Home_Page = (props) => {
    return (
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light col-12">
                <a class="navbar-brand" href="#">Gym Blog</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                        <a href="#" class="nav-item nav-link" onClick={() => props.onFormSwitch('profile')}>Profile</a>
                        <a class="nav-item nav-link" href="#">Post</a>
                        <a href="#" class="nav-item nav-link" onClick={() => props.onFormSwitch('register')}>Sign up</a>
                        <a href="#" class="nav-item nav-link" onClick={() => props.onFormSwitch('login')}>Sign in</a>
                        </div>
                </div>
            </nav>
            <div class="card col-8 ml-auto mr-auto">
                <img src = {image}/>
            </div>

            <div class="container-fluid">
                <FeedPage/>
            </div>

            

            



        </div>

        
        
    );
        

}


export default Home_Page;

