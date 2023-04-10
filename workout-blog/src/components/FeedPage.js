import React, { useState } from 'react';
import './FeedPage.css';
import image from "./images/cbum.jpg"
import postBody from "./images/tennis.jpg"
import {
  useNavigate,
} from "react-router-dom";


function FeedPage() {
  const navigate = useNavigate()
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  
  const handleLike = () => {
    setLikes(likes + 1);
  }
  
  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value;
    setComments([...comments, comment]);
    e.target.elements.comment.value = '';
  }

  return (
    <div className="feed">
      {/* Post 1 */}
      <div className="post">
        <div className="post-header">
          <img onClick={()=>navigate("profile/137")} src={image} alt="post author" className="post-author-avatar" />
          <div className="post-author-name">Username</div>
        </div>
        <div className="post-description">
          Title
        </div>
        <div className="post-body">
          <img src={postBody} alt="post image" className="post-image" />
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

      {/*Post 2*/}
      {/* <div className="post">
        <div className="post-header">
          <img src="post-author-avatar.jpg" alt="post author" className="post-author-avatar" />
          <div className="post-author-name">Post Author</div>
        </div>
        <div className="post-body">
          <img src="post-image.jpg" alt="post image" className="post-image" />
        </div>
        <div className="post-actions">
          <button className="like-button" onClick={handleLike2}>{likes} Likes</button>
          <button className="comment-button">Comment</button>
          <button className="share-button">Share</button>
        </div>
        <div className="post-description">
          I'm here
          </div>
        <div className="comments-section">
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment">{comment}</li>
            ))}
          </ul>
          <form className="comment-form" onSubmit={handleComment}>
            <input type="text" name="comment" placeholder="Add a comment..." />
            <button type="submit">Post</button>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default FeedPage;
