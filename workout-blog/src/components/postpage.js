import React from "react";
import Popup from 'reactjs-popup';
import Likes_button from "./Likes_button";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./postpage.css"

import {
    useNavigate,
    useParams,
    Link,
  } from "react-router-dom";

const Postpage = () => {
    var userid = sessionStorage.getItem("id")
    const navigate = useNavigate()
    const [post, setPost] = useState("");
    const [shared, setshared] = useState("Share Link")
    const [profilePic,setProfilePic] = ("");
    const [id,setid] = useState(sessionStorage.getItem("id"))
    const params = useParams()
    const searchId = params.id
    function signOut() {
      sessionStorage.clear()
    }

    function getBlogPost() {
        var formData = new FormData();   
        formData.append("postid", searchId); 
        axios({
          method: 'POST',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getSinglePost.php",
          data: formData,
        })
          .then(response => {
            setPost(response.data)
            console.log(response.data)

        })
          .catch(error => {
            console.log(error);
          });
      }
    useEffect(() => {
        getBlogPost();
      }, []);
    
    return (
        <div class="container whole_page">
            <nav class="navbar navbar-expand-lg navbar-light col-12">
                <div class="navbar-brand" onClick={() =>navigate("/")}>Gym Blog</div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                      <div onClick={()=>navigate(`../../profile/${id}`)}>
                        {(id && (<Link class="nav-item nav-link" to ={`profile/${id}`}>Profile</Link>))}
                      </div>
                      <div onClick={()=>navigate(`../../`)}>
                        {(id && (<Link onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</Link>))}
                      </div>
                      <div onClick={()=>navigate(`../../register`)}>
                        {(!id && (<Link class="nav-item nav-link">Sign Up</Link>)) } 
                      </div>
                      <div onClick={()=>navigate(`../../login`)}>
                        {(!id && (<Link class="nav-item nav-link">Sign In</Link>)) }
                      </div>
                    </div>
                </div>
            </nav>
            <div className="page">
                <div className="blogpost_header">
                    <div onClick = {()=>navigate(`../../profile/${post.userid}`)}>
                        <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.pfp}`} alt="post author" className="post-author-avatar" />
                        <a className="post-author-name">{post.username}</a>
                        <p className="date">Date Created: {post.created_at}</p>
                    </div>
                </div>
                <div className="post_title">
                    <h1>{post.title}</h1>
                </div>
                <div className="post_image">
                    {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image" />}
                </div>
                <div class="post_body">
                    <p>{post.text}</p>
                </div>
                <div>
                {userid && <Likes_button postid = {searchId}/>} 
                <button onClick={()=>{navigator.clipboard.writeText(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/dev/#/postpage/${post.postid}`);setshared("Copied!")}}>{shared}</button>
                </div>

            </div>
        </div>

        
        
    );  
        

}


export default Postpage;

