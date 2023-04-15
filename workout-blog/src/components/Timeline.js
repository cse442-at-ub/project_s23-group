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

  useEffect(() => {
    getTimeline();
  }, []);

  var formData = new FormData();
  formData.append("userid", props.userid);
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
    {posts.slice().reverse().map(post => (
        <TimelinePosts postid = {post.postid} title={post.title} img = {post.img} created_at = {post.created_at}/>
    ))}
    </div>

  );
}

export default Timeline;

