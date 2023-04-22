import React from "react";
import './timelinepost.css'
import { useState, useEffect, useRef } from 'react';


const Likes_button = (props) => {
  const [liked,setLiked] = useEffect(false)
  const [likeCount, setLikeCount] = useEffect(props.likes)
  function like(){
    if(!liked){
      setLiked(true)
      setLikeCount(likeCount + 1)
    }else{
      setLiked(false)
      setLikeCount(likeCount - 1)
    }
  }
  return (
        <div>
          <image onClick ={() => like()} />
          <p className="like-count">{likeCount}</p>
        </div>
  );
}

export default Likes_button;
