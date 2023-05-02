import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Likes_button from './Likes_button';

function FeedPage() {
  var userid = sessionStorage.getItem("id")
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [posts, setPosts] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [username, setUsername] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    givePost();
    giveProfilePic();
  }, []);

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

  function giveProfilePic() {
    var formData = new FormData();   
    formData.append("id", parseInt(sessionStorage.getItem("id"))); // should be user id 
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/profilePic.php",
      data: formData
    })
      .then(response => {
        console.log(response.data)
        setProfilePic(response.data.pfp);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function getTagClassName(tag) {
    switch (tag) {
      case 'Diet':
        return 'tag-diet';
      case 'Progress':
        return 'tag-progress';
      case 'Max Weight':
        return 'tag-max-weight';
      default:
        return '';
    }
  }
  
  const handleLike = (postId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1
    }));
  };

  const handleComment = (e, postId) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value;
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment]
    }));
    e.target.elements.comment.value = '';
  };

  const handleStateChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tag === selectedTag)
    : posts;

  return (
    <div className="feed">
      <div className="filter">
        <select value={selectedTag} onChange={handleStateChange}>
          <option value="">All</option>
          <option value="Diet">Diet</option>
          <option value="Progress">Progress</option>
          <option value="Max Weight">Max Weight</option>
        </select>
      </div>

      {filteredPosts.slice().reverse().map(post => (
        <div className="post" key={post.postid}>
          <div className="post-header">
            <img onClick={()=>navigate(`profile/${post.userid}`)} src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.pfp}`} alt="post author" className="post-author-avatar" />
            <a onClick={()=>navigate(`profile/${post.userid}`)}  className="post-author-name">{post.username}</a>
          </div>
          <div className="post-description">
            {post.title}
          </div>
          <div className="post-body" onClick={()=>navigate(`postpage/${post.postid}`)}>
            {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image" />}
            {post.text && <p className="post-text">{post.text}</p>}
          </div>
          <div className="post-timestamp">{post.created_at}</div>
          <div>{userid &&<Likes_button postid = {post.postid}/>}</div>
          

          <div className={`post-tag ${getTagClassName(post.tag)}`}>
            {post.tag}
          </div>
          {/* <div className="post-actions">
            <button className="like-button" onClick={() => handleLike(post.postid)}>{likes[post.postid] || 0} Likes</button>
            <button className="share-button">Share</button>
          </div>
   */}
          {/* <div className="comments-section">
            <ul className="comment-list">
              {comments[post.postid] && comments[post.postid].map((comment, index) => (
                <li key={index} className="comment">{comment}</li>
              ))}
            </ul>
            <form className="comment-form" onSubmit={(e) => handleComment(e, post.postid)}>
              <input type="text" name="comment" placeholder="Add a comment..." />
              <button type="submit">Post</button>
              </form> */}
        </div>
      ))}
    </div>

  );
}

export default FeedPage;