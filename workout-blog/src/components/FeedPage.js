import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import staticProfile from './images/profilepic.jpg'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function FeedPage() {
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [posts, setPosts] = useState([]);
  const [pfp, setPfp] = useState([]);
  const [username, setUsername] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    givePost();
    
  }, []);

  useEffect(() => {
    
    
  }, []);
  function givePost() {
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getPost.php",
    })
      .then(response => {
        setPosts(response.data)
        
        
      })
      .catch(error => {
        console.log(error);
      });
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
          <div className="post-body" onClick={()=>navigate(`postpage/${post.postid}`)}>
            <div className="post-image-box">
              {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image" />}
            </div>
            <div className="post-title-box">
              {post.title}
            </div>
            <div className="post-text-box">
              {post.text && <p className="post-text">{post.text}</p>}
            </div>
          </div>
          <div className="post-timestamp">{post.created_at}</div>
          {(post.userid == sessionStorage.getItem("id")) && (<button className='postSettings' onClick={()=>navigate(`postSettings/${post.postid}`)}>Edit</button>)}
          
        </div>
      ))}
    </div>

  );
}

export default FeedPage;