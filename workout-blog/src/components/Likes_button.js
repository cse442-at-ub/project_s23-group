import React from "react";
import './Likes_button.css';
import image from "./images/likes.png"
import { useState, useEffect} from 'react';
import axios from "axios";
import { Form } from "react-router-dom";


const Likes_button = (props) => {
  var userid = Number(sessionStorage.getItem("id"))
  const [postid,setPostid] = useState(props.postid)
  const [likeList, setlikeList] = useState('')
  const [liked,setLiked] = useState('')
  const [likeCount,setlikeCount] = useState('')
  useEffect(()=>{
    GetLikes();
  },[])




  function Like(){
    console.log(liked)
    setLiked(!liked)
    UpdateLike(liked)
  
  }
  
  function UpdateLike(liked){
    console.log(liked)
    var formData = new FormData();
    formData.append("postid",postid)
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
  }
  function GetLikes(){
    var formData = new FormData();
    formData.append("postid",postid)
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getLikes.php",
      headers: {},
      data: formData
    })
    .then((response) => {
        var isSet = false;
        setlikeCount(response.data.length)
        for (let i = 0; i < response.data.length; i++) {
          if(response.data[i].userid == userid){
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
