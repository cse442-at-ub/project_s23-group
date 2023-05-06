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
  const [favoritePosts,setFavoritePosts] = useState([]);
  const [timeline,setTimeline] = useState(true)
  const [favorites,setFavorites] = useState(false)
  const [timelinetab,setTimelineTab] = useState("timeline-tab")
  const [favoritestab,setFavoritesTab] = useState("favorites-tab")
  useEffect(() => {
    getTimeline();
    getFavorties();
  }, []);


  function getFavorties(){
    var formData = new FormData();
    formData.append("userid", props.userid);
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getFavorites.php",
      headers:{},
      data: formData,
    })
      .then(response => {
        console.log(response.data)
        setFavoritePosts(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  } 
  function getTimeline() {
    var formData = new FormData();
    formData.append("userid", props.userid);
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
    <div>
      <div className="timeline">
        <p class = {timelinetab}onClick={()=>{setTimeline(true);setFavorites(false);setTimelineTab("timeline-tab");setFavoritesTab("favorites-tab")}}>Timeline</p>
        <p class = {favoritestab} onClick={()=>{setTimeline(false);setFavorites(true);setTimelineTab("favorites-tab");setFavoritesTab("timeline-tab")}}>Favorites</p>
    </div>
    <div className="timeline-gallery">
    {timeline && posts.slice().reverse().map(post => (
        <TimelinePosts postid = {post.postid} title={post.title} img = {post.img} created_at = {post.created_at} likes = {post.likes}/>
    ))}
    {favorites && favoritePosts.slice().reverse().map(post => (
        <TimelinePosts postid = {post.postid} title={post.title} img = {post.img} created_at = {post.created_at} likes = {post.likes}/>
    ))}
    </div>
  </div>
  );
}

export default Timeline;
