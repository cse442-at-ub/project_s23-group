import React from "react";
import image from "./images/cbum.jpg"
import "./Timeline.css"
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import TimelinePosts from "./timelineposts";
import {
  useNavigate,
} from "react-router-dom";


const Timeline = (props) => {
  const [posts, setPosts] = useState([]);
  const [timeline,setTimeline] = useState(true)
  const [favorites,setFavorites] = useState(false)
  useEffect(() => {
    getTimeline();
  }, []);

  var formData = new FormData();
  formData.append("userid", props.userid);
  function getFavorties(){
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getFavorites.php",
      headers:{},
      data: formData,
    })
      .then(response => {
        console.log(response.data)
        var listofFavorites = response.data
      })
      .catch(error => {
        console.log(error);
      });
  } 
  function getTimeline() {
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getTimeline.php",
      headers:{},
      data: formData,
    })
      .then(response => {
        console.log(response.data)
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <div className="timeline-gallery">
    <div className="timeline">
        <p onClick={()=>{setTimeline(true);setFavorites(false)}}>Timeline</p>
        <p onClick={()=>{setTimeline(false);setFavorites(true)}}>Favorites</p>
    </div>
    {timeline && posts.slice().reverse().map(post => (
        <TimelinePosts postid = {post.postid} title={post.title} img = {post.img} created_at = {post.created_at} likes = {post.likes}/>
    ))}
    
    </div>

  );
}

export default Timeline;

