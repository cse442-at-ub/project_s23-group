import React from "react";
import './Home_Page.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect, useRef } from 'react';
import FeedPage from "../components/FeedPage";
import img from './images/logo-white.png';
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
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
      }

    const signOut = () => {
        sessionStorage.clear();
        setId('')
        setName('')
    }

    useEffect(() => {
        if(sessionStorage.getItem("id")!= null){
            setId(sessionStorage.getItem("id"))
            setName(sessionStorage.getItem("name"))
            console.log("non null")
        }
        console.log("entered")
    }, [id,name]);
    
    return (
        <div className="wrapper">

            <div class="container">
           
            <nav class="navbar navbar-expand-lg navbar-dark col-12">
            <img class="navbar-brand" src={img} onClick={() =>navigate("/")} Gym Blog />
                {/* <div class="navbar-brand"  onClick={() =>navigate("/")}>Gym Blog</div>  */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
               
                    <div class="navbar-nav ml-auto">
                    {(id && (<Link class="nav-item nav-link" to ={`profile/${id}`}>Profile</Link>))}
                    <Link class="nav-item nav-link" to = 'coaches'>Coaching</Link>
                    {(id && (<Link class="nav-item nav-link" to ={`posts`}>Posts</Link>))}
                    {(id && (<Link onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</Link>))}
                    {(!id && (<Link class="nav-item nav-link" to ="register">Sign Up</Link>)) } 
                    {(!id && (<Link class="nav-item nav-link" to ="login">Sign In</Link>)) }
                    </div>
                </div>
            </nav>

           
            <FeedPage/>
            

            

            </div>

        </div>

        
        
    );  
        

}


export default Home_Page;

