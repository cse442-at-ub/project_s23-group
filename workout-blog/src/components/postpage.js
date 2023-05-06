import React from "react";
import Popup from 'reactjs-popup';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./postpage.css"
import img from './images/logo-white.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pen from './images/pen.png'
import {
    useNavigate,
    useParams,
    Link,
  } from "react-router-dom";
  import Likes_button from "./Likes_button";
const Postpage = (props) => {
  var userid = sessionStorage.getItem("id")
  const navigate = useNavigate()
  const [shared, setshared] = useState("Share Link")
  const [post, setPost] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [id,setid] = useState(sessionStorage.getItem("id"))
  const params = useParams()
  const searchId = params.id
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [comAmount, setComAmount] = useState(0);
    function signOut() {
      sessionStorage.clear()
    }
    function handleChange(event) {
      setComment(event.target.value);
    }

    function updateCommentDB(event) {
      
      if(comment.length > 0){
        console.log("in")
          event.preventDefault();
          var formData = new FormData();   
          formData.append("u_id", parseInt(sessionStorage.getItem("id")));//should be user  id 
          formData.append("p_id", searchId);//should be user  id 
          formData.append("comment",comment)   //new
          formData.append("username", sessionStorage.getItem("name"));//new 
          formData.append("pfp",profilePic)   //new
          axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makeCommentDB.php", //fix 
            headers: {'Content-Type': 'multipart/form-data'}, 
            data: formData
          })
          .then(response => {
            console.log(response);
            setComment("");
            giveComment();
            // Add logic to update the UI with the new comment
          })
          .catch(error => {
            console.log(error);
          });
    }
    else{
      setTimeout(()=>{ 
      toast.error("Comments can't be empty", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
      }, 10);
    }
    }

    function giveComment() {
      console.log("giveComments branch")
      axios({
        method: 'post',
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getComments.php",
      })
        .then(response => {
          console.log(response.data)
          const comments = response.data;
          const filteredComments = comments.filter(
            (comment) => parseInt(comment.post_id) === parseInt(searchId)
          );
          console.log(comments)
          console.log(filteredComments)
          console.log(searchId)
          setPostComments(filteredComments);
          setComAmount(filteredComments.length)
        })
        .catch(error => {
          console.log(error);
        });
    }

    function getBlogPost() {
        var formData = new FormData();   
        formData.append("postid", searchId); 
        axios({
          method: 'POST',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getSinglePost.php",
          data: formData,
        })
          .then(response => {
            setPost(response.data)

        })
          .catch(error => {
            console.log(error);
          });
      }
    useEffect(() => {
        getBlogPost();
        giveComment()
      }, []);
    
    return (
      <div className="cover-page">
        <div class="container whole_page">
              <nav class="navbar navbar-expand-lg navbar-dark col-12">
            <img class="navbar-brand" src={img} onClick={() =>navigate("/")} Gym Blog />
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
               
                    <div class="navbar-nav ml-auto">
                    {(id && (<Link class="nav-item nav-link" to ={`..//profile/${id}`}>Profile</Link>))}
                    {(id && (<Link onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</Link>))}
                    {(!id && (<Link class="nav-item nav-link" to ="..//register">Sign Up</Link>)) } 
                    {(!id && (<Link class="nav-item nav-link" to ="..//login">Sign In</Link>)) }
                    </div>
                </div>
            </nav>
            <div className="page">
                <div className="blogpost_header">
                    <div onClick = {()=>navigate(`../../profile/${post.userid}`)}>
                        <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.pfp}`} alt="post author" className="post-author-avatar" />
                        <a className="post-author-name">{post.username}</a>
                        {(post.edited == 1) && (<img className='edited' src={pen} />)}
                        {(post.userid == sessionStorage.getItem("id")) && (<button className='postSettings' onClick={()=>navigate(`/postSettings/${post.postid}`)}>Edit</button>)}
                        <p className="date">Date Created: {post.created_at}</p>
                    </div>
                    
                </div>
                <div class="post_title">
                    <h1>{post.title}</h1>
                </div>
                <div class="post_image">
                    {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image-page" />}
                </div>
                <div class="post_body">
                    <p>{post.text}</p>
                </div>

                <div>
                {userid && <Likes_button postid = {searchId}/>} 
                <button className="share" onClick={()=>{navigator.clipboard.writeText(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/dev/#/postpage/${post.postid}`);setshared("Copied!")}}>{shared}</button>
                </div>
                {id && (  <div class="post_comments">
                <form onSubmit={updateCommentDB}>
                      <textarea value={comment} onChange={handleChange} />
                      <button className="submit-comment" type="submit">Post Comment</button>
                </form>
                <div><u>{comAmount} comments</u></div>
                </div>)}
                {postComments.map((comment) => (
                  <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <div className="comment-header-text" onClick={()=>navigate(`/profile/${comment.user_id}`)}>
                        {comment.pfp && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${comment.pfp}`} alt="comment image" className="comment-image"     style={{ width: "50px", height: "50px" }}
 />}              <div>{()=>navigate(`/profile/${comment.user_id}`)}
                      <p className="comment-username"> {comment.username}</p>
                      </div>
                      <p className="comment-date">{comment.created_at}</p>
                    </div>
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              ))}
            </div>
        </div>
        <ToastContainer />
        </div>
        
    );  
        

}


export default Postpage;

