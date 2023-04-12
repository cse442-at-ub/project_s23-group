import axios from 'axios';
import React, { useState } from 'react';
import "./makePost.css";
import {
    useNavigate,
  } from "react-router-dom";
  import Lottie from "lottie-react";
  import check from "./lotties/check.json"

function MakePost() {
const navigate = useNavigate()
  const [myFile, setMyFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [messageText, setMessageText] = useState('');
  const [title, setTitle] = useState('');


 

  function setFile(event) {
    setMyFile(event.target.files[0]);
  }

  function handleMessageText(event) {
    setMessageText(event.target.value);
  }
  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function uploadPhoto() {
    console.log("starting to upload photo");
    var bodyFormData = new FormData();
    //let name=sessionStorage.getItem("name")
    bodyFormData.append("myFile", myFile);
    //bodyFormData.append("name", name);
    //bodyFormData.append("messageText", messageText);
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePost.php", //change this php name
      headers: {'Content-Type': 'multipart/form-data'}, 
      data: bodyFormData
    })
      .then(response => {
        sessionStorage.setItem("myFile", response.data[0]);
        updatePostDB(title, response.data[0], messageText);
        navigate("/")
      })
      .catch(error => {
        console.log(error);
      });
  }

  const updatePostDB = (title, picture, caption) =>{//Post: postid,userid,title,text,img,created_at    postid and timestamp is auto, dont need to send
    var formData = new FormData();   
    formData.append("id", parseInt(sessionStorage.getItem("id")));//should be user  id 
    formData.append("title",title);
    formData.append("caption",caption);
    formData.append("myFile",picture);
    //need something for created at
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePostDB.php",
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


  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    uploadPhoto(); // Call the uploadPhoto function to submit the photo
  }

  return (
    <div className="mPost">
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