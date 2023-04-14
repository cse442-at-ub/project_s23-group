import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
import image from "./images/cbum.jpg"
import postBody from "./images/tennis.jpg"
import axios from 'axios'
import {
  useNavigate,
} from "react-router-dom";


function FeedPage(props) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  
  const handleLike = () => {
    setLikes(likes + 1);
  }
  
  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value;
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment]
    }));
    e.target.elements.comment.value = '';
  };

  function givePost() {
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getPost.php",
    })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  console.log(props.profile_picture)


  return (
    <div className="feed">
      {/* Post 1 */}
      <div className="post">
        <div className="post-header">
          <img src={props.profile_picture} alt="post author" className="post-author-avatar" />
          <div className="post-author-name">Username</div>
        </div>
        <div className="post-description">
          Title
        </div>
        <div className="post-body">
          <img src={props.post_image} alt="post image" className="post-image" />
        </div>
        <div className="post-actions">
          <button className="like-button" onClick={handleLike}>{likes} Likes</button>
          {/* <button className="comment-button">Comment</button> */}
          <button className="share-button">Share</button>
        </div>
        
        {/* <div className="comments-section">
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment">{comment}</li>
            ))}
          </ul>
          <form className="comment-form" onSubmit={handleComment}>
            <input type="text" name="comment" placeholder="Add a comment..." />
            <button type="submit">Post</button>
          </form>
        </div> */}
      </div>
    </div>

  );
}

export default FeedPage;
