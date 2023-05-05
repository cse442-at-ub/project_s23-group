import React from "react";
import './timelinepost.css'
import { useState, useEffect, useRef } from 'react';
import Likes_button from "./Likes_button";
import './FeedPage.css';
import {
  useNavigate,
  useParams
} from "react-router-dom";


const TimelinePosts = (props) => {
  let userid = sessionStorage.getItem("id")
  const navigate = useNavigate();
  const params = useParams()
  const searchId = params.id

  return (
        <div className="posts" key={props.postid}>
          {(searchId == sessionStorage.getItem("id")) && (<button className='postSettings' onClick={()=>navigate(`/postSettings/${props.postid}`)}>Edit</button>)}
            <div className="post-title">
              {props.title}
              <p className="date">Date Created: {props.created_at}</p>
              
            </div>
            <div onClick = {()=>navigate(`../../postpage/${props.postid}`)} className="image-body">
              <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${props.img}`} alt="post image" className="post-image" />
            </div>
            {userid &&<Likes_button postid = {props.postid} likes = {props.likes}/>}
        </div>
  );
}

export default TimelinePosts;

