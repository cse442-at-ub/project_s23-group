import React from "react";
import Popup from 'reactjs-popup';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./postpage.css"

import {
    useNavigate,
    useParams,
  } from "react-router-dom";

const Postpage = (props) => {
    const navigate = useNavigate()
    const [post, setPost] = useState("");
    const [profilePic,setProfilePic] = ("");
    const params = useParams()
    const searchId = params.id
    function getProfilePic() {
        var formData = new FormData();   
        formData.append("id", parseInt(sessionStorage.getItem("id"))); // should be user id 
        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/profilePic.php",
          data: formData
        })
          .then(response => {
            console.log(response.data)
            setProfilePic(response.data.pfp);
          })
          .catch(error => {
            console.log(error);
          });
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
            </nav>
            <div className="page">
                <div className="blogpost_header">
                    <div onClick = {()=>navigate(`../../profile/${post.userid}`)}>
                        <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.pfp}`} alt="post author" className="post-author-avatar" />
                        <a className="post-author-name">{post.username}</a>
                        <p className="date">Date Created: {post.created_at}</p>
                    </div>
                </div>
                <div class="post_title">
                    <h1>{post.title}</h1>
                </div>
                <div class="post_image">
                    {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image" />}
                </div>
                <div class="post_body">
                    <p>{post.text}</p>
                </div>
                <div><button onClick={navigator.clipboard.writeText(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/dev/#/postpage/${post.postid}`)
}>Share</button></div>
            </div>
        </div>

        
        
    );  
        

}


export default Postpage;

