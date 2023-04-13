import React from "react";
import FeedPage from "../components/FeedPage";
import "./Timeline.css"
import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
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


  function getTimeline() {
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getPost.php",
    })
      .then(response => {
        console.log(response)
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <div className="timeline-gallery">
    {posts.slice().reverse().map(post => (
        <TimelinePosts postid = {post.postid} userid = {post.userid} title = {post.title} />
    ))}
  </div>

  );
}

export default Timeline;

