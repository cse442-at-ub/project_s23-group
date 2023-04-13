import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Profile.css'
import staticProfile from './images/profilepic.jpg'
import staticBackground from './images/weights.jpg'
import {
    Link,
    useNavigate,
    useParams,
  } from "react-router-dom";
  

const Profile = (props) =>{
    
    const navigate = useNavigate()
    const params = useParams()
    const [bio, setBio] = useState('')
    const [profile, setProfile] = useState('');
    const [background, setBackground] = useState('');
    const [name, setName] = useState('');
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followers, setFollowers] = useState([]);
  
    const toggleFollowingPopup = () => {
      setShowFollowing(!showFollowing);
    };
  
    const toggleFollowersPopup = () => {
      setShowFollowers(!showFollowers);
    };

    const handleRemoveUser = (id) => {
        const updatedUsers = followingUsers.filter(user => user.id !== id);
        setFollowingUsers(updatedUsers);
    };

    const handleRemoveFollower = (id) => {
        const updatedFollowers = followers.filter(follower => follower.id !== id);
        setFollowers(updatedFollowers);
      };
    const searchId = params.id
   
   



    useEffect(() => {
    

        if(sessionStorage.getItem("id") == null){
            console.log("1")
            navigate("/")
            
        }
        else{
            console.log("2")
         
            getImages()
            
        }
       
    }, []);

    const getImages = () =>{
        var formData = new FormData();
        formData.append("id", searchId);
    
        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/profileGet.php",
          headers: {}, 
          data: formData
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("bio",response.data[2])
          sessionStorage.setItem("background",response.data[3])
          sessionStorage.setItem("pfp",response.data[4])
          sessionStorage.setItem("name",response.data[1])

        setBio(sessionStorage.getItem("bio"))
        setProfile("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/" + sessionStorage.getItem("pfp"))
        setBackground("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/" + sessionStorage.getItem("background"))
        setName(sessionStorage.getItem("name"))
       
        
        }, (error) => {
            setBio("Go to settings to change info")
            setProfile(staticProfile)
            setBackground(staticBackground)
            setName("Mock User")
            
          console.log(error);
        });
  
      
    }

    // follow feature
    const handleFollowUser = () => {
        const formData = new FormData();
        formData.append("follower_id", sessionStorage.getItem("id"));
        formData.append("following_id", searchId);

        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/follow.php",
            headers: {},
            data: formData
        })
        .then((response) => {
            const newFollowingUsers = [...followingUsers, {id: searchId, name: name}];
            setFollowingUsers(newFollowingUsers);
        }, (error) => {
            console.log(error);
        });
    }

    const getFollowingUsers = () => {
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/following.php",
            headers: {},
            data: { id: searchId }
        })
        .then((response) => {
            setFollowingUsers(response.data);
        }, (error) => {
            console.log(error);
        });
    }

    const getFollowers = () => {
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/followers.php",
            headers: {},
            data: { id: searchId }
        })
        .then((response) => {
            setFollowers(response.data);
        }, (error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getFollowingUsers();
        getFollowers();
    }, []);

 
    let dynamicBackground = {
            backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(27,27,27,1) 43%),url("${background}")`
            
            //  backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(27,27,27,1) 43%),url( 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/basketball(1).jpg')`
    }

  

   
   
   

   

    return(
        <div class="bg2">
            
            <div className="bg2abs" style={dynamicBackground}/> 
                        <div class="headers">
                            <img class='home' onClick={() => navigate("/")} src={require("./images/home.png")}  />
                            {/* <button class='follow'>Follow</button>
                            <button class='message'>Message</button> */}
                           <button className='follow' onClick={() => {handleFollowUser(); setIsFollowing(!isFollowing)}}>
                            {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                            {(searchId == sessionStorage.getItem("id")) && (<img class='settings' onClick={() => navigate("settings")} src={require("./images/settings.png")} />)}
                        </div>
                        <div class="imgbox">
                            
                            <img className='profile' src={profile} />
                        
                        </div>
                    
                        <div class = "name">{name}</div>
                            <div class="desc" >
                            
                            {bio}
                        </div>
                        <div class="buttons">
                            <button className='postwrap' onClick={() =>{console.log("posts")}}>
                                <div className="post">
                                    1290 
                                </div>
                                <div className="postbutton">
                                    Posts
                                </div>
                            </button>
                            <button className='followingwrap' onClick={toggleFollowingPopup}>
                                <div className="following">{followingUsers.length}</div>
                                <div className="followingbutton">Following</div>
                            </button>
                            <button className="followerwrap" onClick={toggleFollowersPopup}>
                                <div className="follower">{followers.length}</div>
                                <div className="followerbutton">Follower</div>
                            </button>
                           
                        </div>
                        <div className="timeline">
                            Timeline
                        </div>
                        <div className='gallery'>
                        <img  src={require("./images/bike.jpg")} />
                        <img  src={require("./images/basketball.jpg")} />
                        <img  src={require("./images/weights.jpg")} />
                        <img  src={require("./images/box.jpg")} />
                        <img  src={require("./images/run.jpg")} />
                        <img  src={require("./images/tennis.jpg")} />
                        <img  src={require("./images/weights2.jpg")} />
                        </div>
                        {showFollowing && (
                        <div className="popup">
                        <div className="popup-inner">
                            <h2>Following</h2>
                            <ul>
                            {followingUsers.map((user) => (
                                <li key={user.id}>
                                <img src={user.profilePic} alt={`${user.name}'s profile`} />
                                <Link to={`/profile/${user.id}`}>{user.name}</Link>
                                    <span className="popup-username">{user.name}</span>
                                    
                    
                            <button
                            className="popup-remove"
                            onClick={() => handleRemoveUser(user.id)}
                            >
                            Remove
                            </button>
                            </li>
                            ))}
                            </ul>
                            <button className="popup-close" onClick={toggleFollowingPopup}>
                            Close
                            </button>
                            </div>
                            </div>
                            )}
            
                            {/* Followers popup */}
                            {showFollowers && (
                            <div className="popup">
                                <div className="popup-inner">
                                <h2>Followers</h2>
                                <ul>
                                    {followers.map((follower) => (
                                    <li key={follower.id}>
                                    <img
                                        src={follower.profilePic}
                                        alt={`${follower.name}'s profile`}
                                        />
                                    <Link to={`/profile/${follower.id}`}>{follower.name}</Link>
                                    <span className="popup-username">{follower.name}</span>
                                    <button
                                    className="popup-remove"
                                    onClick={() => handleRemoveFollower(follower.id)}
                                    >
                                    Remove
                                    </button>
                                    </li>
                                    ))}
                                    </ul>
                                    <button className="popup-close" onClick={toggleFollowersPopup}>
                                    Close
                                    </button>
                                    </div>
                                    </div>
                                    )}
                                            

                                
                            </div>

    );

};

export default Profile;