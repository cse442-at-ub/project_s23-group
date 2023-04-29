import axios from 'axios';
import React, { useState } from 'react';
import "./makePost.css";
import {
    useNavigate,
  } from "react-router-dom";
  import Lottie from "lottie-react";
  import check from "./lotties/check.json"
  import { useEffect, useRef } from 'react';
import FeedPage from "../components/FeedPage";
import {
    Link,
    Route,
    Routes,
    useLocation,
    Navigate
  } from "react-router-dom";

function MakePost() {
const navigate = useNavigate()
  const [myFile, setMyFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [messageText, setMessageText] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [selectedOption, setSelectedOption] = useState('Progress');
  const [profilePic, setProfilePic] = useState([]);


  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }
 
  const signOut = () => {
    sessionStorage.clear();
    setId('')
    setName('')
    navigate("/")
}
  function setFile(event) {
    setMyFile(event.target.files[0]);
  }

  function handleMessageText(event) {
    setMessageText(event.target.value);
  }
  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function giveProfilePic(userId) {
    var formData = new FormData();
    formData.append("id", parseInt(sessionStorage.getItem("id")));
    return axios({
      method: "post",
      url:
        "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/profileGet.php",
      data: formData,
    })
      .then((response) => {
        console.log("before");
        console.log(response.data);
        setProfilePic(response.data[4]); // use the 4th index to set the profile pic
        console.log("after");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function uploadPhoto() {
    console.log("starting to upload photo");
    var bodyFormData = new FormData();
    bodyFormData.append("myFile", myFile);
    axios({
      method: "post",
      url:
        "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePost.php",
      headers: { "Content-Type": "multipart/form-data" },
      data: bodyFormData,
    })
      .then((response) => {
        
        sessionStorage.setItem("myFile", response.data[0]);
        giveProfilePic(sessionStorage.getItem("id")).then(() => {
          console.log("before");
          console.log(profilePic);
          updatePostDB(title, response.data[0], messageText,profilePic);
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  const updatePostDB = (title, picture, caption, pfp) =>{//Post: postid,userid,title,text,img,created_at    postid and timestamp is auto, dont need to send
    var formData = new FormData();   
    formData.append("id", parseInt(sessionStorage.getItem("id")));//should be user  id 
    formData.append("pfp", pfp);//should be user  id 
    formData.append("title",title);
    formData.append("caption",caption);
    formData.append("myFile",picture);
    formData.append("tag",selectedOption)   //new
    formData.append("username", sessionStorage.getItem("name"));//new 
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePostDB.php",
      //url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePostDBE.php",
      headers: {'Content-Type': 'multipart/form-data'}, 
      data: formData
    })
    .then((response) => {
      console.log(response);
     // setLoad(false)
      //navigate("/profile:id")

    }, (error) => {
      console.log(error);
    });

  console.log("Success")
}
useEffect(() => {
 // if (sessionStorage.getItem("id") !== null) {
    setId(sessionStorage.getItem("id"));
    setName(sessionStorage.getItem("name"));
    console.log("non null");
    giveProfilePic(sessionStorage.getItem("id")); // add this line to retrieve the user's profile picture
 // }

  console.log("entered");
}, [id, name]);

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    uploadPhoto(); // Call the uploadPhoto function to submit the photo
  }

  return (
    <div className="mPost">
         <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light col-12">
                <a class="navbar-brand" href="#">Gym Blog</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                    {(id && (<Link class="nav-item nav-link" to ={`/profile/${id}`}>Profile</Link>))}
                    {(id && (<button onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</button>))}
                    </div>
                </div>
            </nav>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group files">
          <label>Choose your Photo </label>
          <input type="file" className="form-control" multiple="" onChange={setFile} />
        </div>
        <div className="form-group1">
          <label htmlFor="message-text1" className="col-form-label1">Title:</label>
          <textarea className="form-control1" id="message-text1" value={title} onChange={handleTitle}></textarea>
        </div>
        <div className="form-group2">
          <label htmlFor="message-text2" className="col-form-label2">Message:</label>
          <textarea className="form-control2" id="message-text2" value={messageText} onChange={handleMessageText}></textarea>
        </div>
        <div className="form-group3">
          <label htmlFor="dropdown" className="col-form-label3">Select an option:</label>
          <select id="dropdown" className="form-control3" value={selectedOption} onChange={handleOptionChange}>
            <option value="Progress">Progress</option>
            <option value="Diet">Diet</option>
            <option value="Max Weight">Max Weight</option>
          </select>
        </div>
        <button
          style={{
            background: '#150',
            color: '#fff',
            padding: "10px",
            fontSize: '18px',
            cursor: 'pointer'
          }}
          type="submit" // Set the button type to "submit"
        >
          Submit Post
        </button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default MakePost;



     
