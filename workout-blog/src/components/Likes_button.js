import React from "react";
import './Likes_button.css';
import image from "./images/likes.png"
import { useState, useEffect} from 'react';
import axios from "axios";
import { Form } from "react-router-dom";


const Likes_button = (props) => {
  var userid = sessionStorage.getItem("id")
  const [likeList, setlikeList] = useState('')
  const [liked,setLiked] = useState('')
  const [likeCount,setlikeCount] = useState('')
  useEffect(()=>{
    GetLikes();
  },[])

  function Like(){
    setLiked(!liked)
    UpdateLike(liked)
  }

  function UpdateLike(liked){
    var formData = new FormData();
    formData.append("postid",props.postid)
    formData.append("userid",userid)
    if(!liked){
      console.log("added")
      axios({
        method: 'post',
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makeLike.php",
        headers: {},
        data: formData 
      })
      .then((response) => {
        setlikeCount(likeCount + 1)
      }, (error) => {
          console.log(error);
      });
    }else{
      console.log("removed")
      axios({
        method: 'post',
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/removeLike.php",
        headers: {},
        data: formData 
      })
      .then((response) => { 
        setlikeCount(likeCount - 1)
      }, (error) => {
          console.log(error);
      });
    }
    GetLikes()
  }
  function GetLikes(){
    var formData = new FormData();
    formData.append("postid",props.postid)
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getLikes.php",
      headers: {},
      data: formData
    })
    .then((response) => {
        var isSet;
        setlikeCount(response.data.length)
        console.log(response.data)
        for (var post in response.data){
          if(response.data[post].userid = userid){
            isSet = true
          }else{
            isSet = false
          }
        }
        setLiked(isSet)
        
    }, (error) => {
        console.log(error);
    });
}
  

  return (
        <div className="like-container">
          <img onClick = {()=>Like()} src= {image} alt="Like"/>
          <div className="like-count">{likeCount}</div>
        </div>
  );
}

export default Likes_button;
