import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Profile.css'
import staticProfile from './images/profilepic.jpg'
import staticBackground from './images/weights.jpg'
import Timeline from './Timeline'
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
    const [followingUsers, setFollowingUsers] = useState([
        { id: 1, name: 'Mock User 1', profilePic: require('./images/profilepic.jpg') },
        { id: 2, name: 'Mock User 2', profilePic: require('./images/profilepic.jpg') },
        { id: 3, name: 'Mock User 3', profilePic: require('./images/profilepic.jpg') },
        { id: 4, name: 'Mock User 4', profilePic: require('./images/profilepic.jpg') },
    ]);

    const [followers, setFollowers] = useState([
        { id: 1, name: 'Mock User 4', profilePic: require('./images/profilepic.jpg') },
        { id: 2, name: 'Mock User 5', profilePic: require('./images/profilepic.jpg') },
        { id: 3, name: 'Mock User 6', profilePic: require('./images/profilepic.jpg') },
      ]);
  
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

    const signOut = () => {
        sessionStorage.clear();
        console.log("exit")
    }

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

 
let dynamicBackground = {
        backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(27,27,27,1) 43%),url("${background}")`
        
        //  backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(27,27,27,1) 43%),url( 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/basketball(1).jpg')`
   }

  

   
   
   

   

    return(
        <div class="bg2">
            
            <div className="bg2abs" style={dynamicBackground}/> 
                        <div class="headers">
                        <nav class="navbar navbar-expand-lg navbar-dark col-12">
                <button class="navbar-brand" onClick={() =>navigate("/")}>Gym Blog</button>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                    
                    {(sessionStorage.getItem("id") && (<Link class="nav-item nav-link" to ={`posts`}>Posts</Link>))}
                    {(searchId == sessionStorage.getItem("id") && (<Link class="nav-item nav-link" to ={`settings`}>Settings</Link>))}
                    {(sessionStorage.getItem("id") && (<Link to={"/"} onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</Link>))}
                  
                    </div>
                </div>
            </nav>
                           
                            {/* <button class='follow'>Follow</button>
                            <button class='message'>Message</button> */}
                           
                           
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
                            <div className="post">12</div>
                                <div className="postbutton">Posts</div>
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
                            <div className="innerGallery">
                                <Timeline userid = {sessionStorage.getItem("id")}/>]
                            </div>
                        </div>
                        {showFollowing && (
                        <div className="popup">
                        <div className="popup-inner">
                            <h2>Following</h2>
                            <ul>
                            {followingUsers.map((user) => (
                                <li key={user.id}>
                                <img src={user.profilePic} alt={`${user.name}'s profile`} />
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

    )

}

export default Profile