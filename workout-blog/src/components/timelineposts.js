import React from "react";
import './timelinepost.css'
import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
import {
  useNavigate,
  useParams
} from "react-router-dom";


const TimelinePosts = (props) => {
  const navigate = useNavigate();
  const params = useParams()
  const searchId = params.id

  return (
        <div className="posts" key={props.postid}>
            <div className="post-title">
              {props.title}
              <p className="date">Date Created: {props.created_at}</p>
              {(searchId == sessionStorage.getItem("id")) && (<button className='postSettings' onClick={()=>navigate(`/postSettings/${props.postid}`)}>Edit</button>)}
            </div>
            <div onClick = {()=>navigate(`../../postpage/${props.postid}`)} className="image-body">
              <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${props.img}`} alt="post image" className="post-image" />
            </div>
        </div>
  );
}

export default TimelinePosts;

