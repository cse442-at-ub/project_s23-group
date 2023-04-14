import React from "react";
import FeedPage from "../components/FeedPage";
import image from "./images/cbum.jpg"

import "./Timeline.css"
import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
import axios from 'axios'
import TimelinePosts from "./timelineposts";
import {
  useNavigate,
} from "react-router-dom";


const Timeline = (props) => {
<<<<<<< HEAD
  const [posts, setPosts] = useState([]);
=======

    return (
        <div class = "gallery container-fluid row">
            {

            }
            <FeedPage profile_picture = {image}  post_image = {image} class ="col-sm-4 "/>
        </div>
    );
        
>>>>>>> cc8a46149be90aa858e1bbe511273a1c118af758

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
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <div className="timeline-gallery">
    {posts.slice().reverse().map(post => (
      <TimelinePosts title={post.title} img = {post.img} />
    ))}
    </div>

  );
}

export default Timeline;

