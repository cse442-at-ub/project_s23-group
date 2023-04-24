import React from "react";
import './Likes_button.css';
import image from "./images/likes.png"
import { useState, useEffect} from 'react';
import axios from "axios";


const Likes_button = (props) => {
  const [liked,setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(props.likes)
  function like(){
    
    if(liked == false){
      setLiked(true)
      setLikeCount(likeCount + 1)
    }else{
      setLiked(false)
      setLikeCount(likeCount - 1)
    }
  }
  useEffect(() => {
    updateLikes();
  },[liked]);

  useEffect(()=>{
    setLikeCount(props.likes);
  },[props]);

  function updateLikes() {
    var formData = new FormData();
    formData.append("postid", props.postid);
    formData.append("likes",likeCount)
    return axios({
      method: "post",
      url:
        "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/updateLikes.php",
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
        <div className="like-container">
          <img onClick ={() => like()} src= {image} alt="Like"/>
          <div className="like-count">{likeCount}</div>
        </div>
  );
}

export default Likes_button;
