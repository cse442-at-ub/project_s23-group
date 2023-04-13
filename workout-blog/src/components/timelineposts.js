import React from "react";
import './timelinepost.css'
import './FeedPage.css'
import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
import {
  useNavigate,
} from "react-router-dom";


const TimelinePosts = (props) => {
    const navigate = useNavigate();
  return (
    <div class = "feed">
        <div className="posts" key={props.postid}>
            <div className="post-header">
            <img onClick={()=>navigate(`profile/${props.userid}`)} src={props.img} alt="post author" className="post-author-avatar" />
            <div className="post-author-name">{props.username}</div>
            </div>
            <div className="post-description">
            {props.title}
            </div>
            <div className="post-body">
            {props.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${props.img}`} alt="post image" className="post-image" />}
            {props.text && <p className="post-text">{props.text}</p>}
            </div>
        </div>
    </div>
  );
}

export default TimelinePosts;

