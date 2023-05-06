import { useState, useEffect, useRef } from 'react';
import './FeedPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import staticProfile from './images/profilepic.jpg'
import Likes_button from './Likes_button';
function FeedPage() {
  var userid = sessionStorage.getItem("id")
  const navigate = useNavigate();
  const [recent,setRecent] = useState(true)
  const [mostLiked,setMostLiked] = useState(false)
  const [following,setFollowing] = useState(false)
  const [likes, setLikes] = useState({});
  const [posts, setPosts] = useState([]);
  const [topPosts,setTopPosts] = useState([]);
  const [followingPosts,setFollowingPost] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [displayTag, setDisplayTag] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [displayTags, setDisplayTags] = useState([]);


  useEffect(() => {
    givePost();
    
  }, []);


  function givePost() {
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getPost.php",
    })
      .then(response => {
        
        for (let p of response.data) {
          if (p.text.length >=150) {
              p.text = p.text.substring(0,150) + "...";
          }
          if(!p.pfp){
            p.pfp = `profilepic.jpg`
          }
      }
      setPosts(response.data)
      })
      .catch(error => {
        console.log(error);
      });
      var formData = new FormData();
      formData.append("userid", userid);
      axios({
        method: 'post',
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getPostByFollow.php",
        headers:{},
        data: formData,
      })
        .then(response => {
          for (let p of response.data) {
            if (p.text.length >=150) {
                p.text = p.text.substring(0,150) + "...";
            }
            if(!p.pfp){
              p.pfp = `profilepic.jpg`
            }
        }
          setFollowingPost(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
      axios({
        method: 'post',
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getPostByLikes.php",
      })
        .then(response => {
          for (let p of response.data) {
            if (p.text.length >=150) {
                p.text = p.text.substring(0,150) + "...";
            }
            if(!p.pfp){
              p.pfp = `profilepic.jpg`
            }
        }
          setTopPosts(response.data);
          console.log(response.data)
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

 
  const handleTagCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTags((prevTags) => [...prevTags, value]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== value));
    }
  };

  const handleStateChange = (e) => {
    const selectedOptions = Array.from(e.target.querySelectorAll('input[type="checkbox"]:checked'));
    const selectedValues = selectedOptions.map((option) => option.value);

    setSelectedTags(selectedValues);

    const isRecentSelected = selectedValues.includes("");
    const isMostLikedSelected = selectedValues.includes("Top Posts");
    const isFollowingSelected = selectedValues.includes("Following");

    setRecent(isRecentSelected);
    setMostLiked(isMostLikedSelected);
    setFollowing(isFollowingSelected);
  };

  const filteredPosts = selectedTags.length > 0
    ? posts.filter((post) => selectedTags.includes(post.tag))
    : posts;




  return (
<div className="feed">
      <div className="filter">
        <label>
          <input
            type="checkbox"
            value=""
            checked={selectedTags.length === 0}
            onChange={handleTagCheckboxChange}
          />
          All
        </label>
        <label>
          <input
            type="checkbox"
            value="Diet"
            checked={selectedTags.includes("Diet")}
            onChange={handleTagCheckboxChange}
          />
          Diet
        </label>
        <label>
          <input
            type="checkbox"
            value="Progress"
            checked={selectedTags.includes("Progress")}
            onChange={handleTagCheckboxChange}
          />
          Progress
        </label>
        <label>
          <input
            type="checkbox"
            value="Max Weight"
            checked={selectedTags.includes("Max Weight")}
            onChange={handleTagCheckboxChange}
          />
          Max Weight
        </label>
        <label>
          <input
            type="checkbox"
            value="Top Posts"
            checked={selectedTags.includes("Top Posts")}
            onChange={handleTagCheckboxChange}
          />
          Top Posts
        </label>
        <label>
          <input
            type="checkbox"
            value="Following"
            checked={selectedTags.includes("Following")}
            onChange={handleTagCheckboxChange}
          />
          Following
        </label>
      </div>

      {recent && filteredPosts.slice().reverse().map(post => (
        <div className="post" key={post.postid}>
          <div className="post-header">
            <img onClick={()=>navigate(`profile/${post.userid}`)} src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.pfp}`} alt="post author" className="post-author-avatar" />
            <a onClick={()=>navigate(`profile/${post.userid}`)}  className="post-author-name">{post.username}</a>
          </div>
         
          <div className="post-body" onClick={()=>navigate(`postpage/${post.postid}`)}>
            {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image" />}
            <div className="post-title-box">
            {post.title}
          </div>
            {post.text && <p className="post-text-box">{post.text}</p>}
          </div>
          <div className="post-timestamp">{post.created_at}</div>

          <div className="post-action">
          <div>{userid &&<Likes_button postid = {post.postid} likes = {post.likes}/>}</div>
          

            <div className={`post-tag ${getTagClassName(post.tag)}`}>
              {post.tag}
            </div>
          </div>
          {(post.userid == sessionStorage.getItem("id")) && (<button className='postSettings' onClick={()=>navigate(`postSettings/${post.postid}`)}>Edit</button>)}
          
        </div>
      ))}

      {following && followingPosts.slice().reverse().map(post => (
        <div className="post" key={post.postid}>
          <div className="post-header">
            <img onClick={()=>navigate(`profile/${post.userid}`)} src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.pfp}`} alt="post author" className="post-author-avatar" />
            <a onClick={()=>navigate(`profile/${post.userid}`)}  className="post-author-name">{post.username}</a>
          </div>
          <div className="post-body" onClick={()=>navigate(`postpage/${post.postid}`)}>
            {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image" />}
            <div className="post-title-box">
            {post.title}
          </div>
            {post.text && <p className="post-text-box">{post.text}</p>}
          </div>
          <div className="post-timestamp">{post.created_at}</div>
          <div>{userid &&<Likes_button postid = {post.postid} likes = {post.likes}/>}</div>
          

          <div className={`post-tag ${getTagClassName(post.tag)}`}>
            {post.tag}
          </div>    
          {(post.userid == sessionStorage.getItem("id")) && (<button className='postSettings' onClick={()=>navigate(`postSettings/${post.postid}`)}>Edit</button>)}
          </div>
        ))}
      {mostLiked && topPosts.slice().map(post => (
        <div className="post" key={post.postid}>
          <div className="post-header">
            <img onClick={()=>navigate(`profile/${post.userid}`)} src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.pfp}`} alt="post author" className="post-author-avatar" />
            <a onClick={()=>navigate(`profile/${post.userid}`)}  className="post-author-name">{post.username}</a>
          </div>
          
          <div className="post-body" onClick={()=>navigate(`postpage/${post.postid}`)}>
            {post.img && <img src={`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${post.img}`} alt="post image" className="post-image" />}
            <div className="post-title-box">
            {post.title}
          </div>
            {post.text && <p className="post-text-box">{post.text}</p>}
          </div>
          <div className="post-timestamp">{post.created_at}</div>
          
          

          <div className={`post-tag ${getTagClassName(post.tag)}`}>
          <div>{userid &&<Likes_button postid = {post.postid} likes = {post.likes}/>}</div>
            {post.tag}
          </div>
          {(post.userid == sessionStorage.getItem("id")) && (<button className='postSettings' onClick={()=>navigate(`postSettings/${post.postid}`)}>Edit</button>)}
          </div>
      ))}



    </div>

  );
}

export default FeedPage;