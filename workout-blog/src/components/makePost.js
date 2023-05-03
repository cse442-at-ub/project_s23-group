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
  import img from './images/logo-white.png';
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if(event.target.files[0].size <= 2000000){
      setMyFile(event.target.files[0]);
    }
    else{
      toast.warning('File size must be less than 2MB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    
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
  if (sessionStorage.getItem("id") !== null) {
    setId(sessionStorage.getItem("id"));
    setName(sessionStorage.getItem("name"));
    console.log("non null");
    giveProfilePic(sessionStorage.getItem("id")); // add this line to retrieve the user's profile picture
  }

  console.log("entered");
}, [id, name]);

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    uploadPhoto(); // Call the uploadPhoto function to submit the photo
  }

  return (
    <div className="mPost">
         <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark col-12">
            <img class="navbar-brand" src={img} onClick={() =>navigate("/")} Gym Blog />
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
      <div className="make-post-title">
        Make a post
      </div>
      <div className="make-post-card">
        <form onSubmit={handleSubmit}>
        <label htmlFor="dropdown" className="col-form-label3">Select an option:</label>
        
        <div className="form-group3">
            
            <select id="dropdown" className="form-control3" value={selectedOption} onChange={handleOptionChange}>
              <option value="Progress">Progress</option>
              <option value="Diet">Diet</option>
              <option value="Max Weight">Max Weight</option>
            </select>
          </div>
          <div className="form-group1">
            <input className="form-control1" id="message-text1" placeholder='Title' value={title} onChange={handleTitle}></input>
          </div>
          <label>Choose your Photo </label>
          <div className="form-group-files">
            
            <input type="file" className="form-control" multiple="" onChange={setFile} />
          </div>
        
          <div className="form-group2">
            <textarea className="form-control2" id="message-text2" placeholder='Caption' value={messageText} onChange={handleMessageText}></textarea>
          </div>
        
          <div className="submit-post-box">
            <button
              className='submit-post'
            
              type="submit" // Set the button type to "submit"
            >
              Submit Post
            </button>
          </div>
        </form>
        <div style={{ marginTop: '10px' }}>
          <p>{msg}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MakePost;



     
