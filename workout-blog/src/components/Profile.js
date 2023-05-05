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
  import img from './images/logo-white.png';
  

const Profile = (props) =>{
    const [bio, setBio] = useState('')
    const [profile, setProfile] = useState('');
    const [background, setBackground] = useState('');
    const [name, setName] = useState('');
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
    const [showAlreadyFollowingPopup, setShowAlreadyFollowingPopup] = useState(false);
    const [showChat, setChats] = useState(false);
    const [mainfollowing, setMainfollowing] = useState([]);
    const[messages, setAllMessages] = useState([]);
    const[JustSent, sentMessages] = useState('');
    const navigate = useNavigate()
    const params = useParams()
    const searchId = params.id
    const userIds = followingUsers.map(user => user.following);

    const toggleFollowingPopup = () => {
        setShowFollowing(!showFollowing);
        getUsernames();
      };
    
      const toggleFollowersPopup = () => {
        setShowFollowers(!showFollowers);
        getUsernames_for_Followers();
      };
  
      const getPosts = () => {
          getNumPosts();
      }
  
      const toggleMessagePopup = () => {
          setChats(!showChat);
          
          getMessages();
          
      };
  

    useEffect(() => {
            window.scrollTo(0, 0)
            getImages()
            getFollowingMainUser()
            getFollowingUsers();
            getFollowers();
            getNumPosts();
        
    }, []);


    useEffect(() => {
        const userIds = mainfollowing.map(user => user.following);
        setIsAlreadyFollowing(userIds.includes(parseInt(searchId)));
      }, [mainfollowing, searchId]);

    const signOut = () => {
        sessionStorage.clear();
    }

    const getMessages = () => {
        const formData = new FormData();
        formData.append("userid", sessionStorage.getItem("id"));
        formData.append("targetid", searchId);  
        
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getDMs.php",
            headers: {},
            data: formData
        })
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].length === 0) {
                    response.data.splice(i, 1);
                    i--;
                }
                }
            
            
                setAllMessages(response.data);
              
          })
          .catch(error => console.error(error));
      };

      const getChatUsername = async () => {
        const requests = messages.map(user => {
          const formData = new FormData();
          formData.append("userid", parseInt(user.sender));
          
          return axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getUserInfo.php", formData);
        });
      
        try {
          const responses = await Promise.all(requests);
          const updatedmessages = messages.map((message, index) => {
            const data = responses[index].data;
            
            if (data && data.username) {
              return { ...message, username: data.username, pfp: data.pfp};
            } else {
              console.log(`Invalid response data for user ${message.sender}: ${data}`);
              return message;
            }
          });
          setAllMessages(updatedmessages);
          console.log(updatedmessages);
        } catch (error) {
          console.log("Error fetching usernames:", error);
        }
      };

      const sendDM = () => {
        const formData = new FormData();
        formData.append("sender", sessionStorage.getItem("id"));
        formData.append("receiver", searchId);
        formData.append("message", JustSent);
      
        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/sendDM.php",
          headers: {},
          data: formData
        })
          .then((response) => {
            sentMessages('');
      
            getMessages();
          })
          .catch((error) => console.error(error));
      };



    //number of posts on database
    const getNumPosts = () => {
        const formData = new FormData();
        formData.append("userid", searchId)

        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getTimeline.php",
            headers:{},
            data: formData,
        })
            .then(response => {
            setPosts(response.data);
            })
            .catch(error => {
            console.log(error);
            });
    }
    
    const handleFollowUser = () => {
        const formData = new FormData();
        formData.append("follower", sessionStorage.getItem("id"));
        formData.append("following", searchId);

        
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makeFollow.php",
            headers: {},
            data: formData
        })
        .then((response) => {
            setIsAlreadyFollowing(true);
            getFollowingUsers();
            getFollowers();
            getUsernames();
            
        }, (error) => {
            console.log(error);
        });
    }

    const getFollowingMainUser = () => {
        var formData = new FormData();
        formData.append("id", sessionStorage.getItem("id"));
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getFollowing.php",
            headers: {},
            data: formData
        })
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].length === 0) {
                    response.data.splice(i, 1);
                    i--;
                }
                }
            
            console.log(response.data);
            setMainfollowing(response.data);
            
        }, (error) => {
            console.log(error);
        });
    }

    const getFollowingUsers = () => {
        var formData = new FormData();
        formData.append("id", searchId);
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getFollowing.php",
            headers: {},
            data: formData
        })
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].length === 0) {
                    response.data.splice(i, 1);
                    i--;
                }
                }
            
                
            setFollowingUsers(response.data);
            
        }, (error) => {
            console.log(error);
        });
    }
   

    // get followers list from the database
    const getFollowers = () => {
        var formData = new FormData();
        formData.append("id", searchId);
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getFollowers.php",
            headers: {},
            data: formData
        })
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].length === 0) {
                    response.data.splice(i, 1);
                    i--;
                }
                }
            
                
            setFollowers(response.data);
        }, (error) => {
            console.log(error);
        });
    }

    
        
    const getUsernames = async () => {
        const requests = followingUsers.map(user => {
          const formData = new FormData();
          formData.append("userid", user.following);
          return axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getUserInfo.php", formData);
        });
      
        try {
          const responses = await Promise.all(requests);
          const updatedFollowingUsers = followingUsers.map((user, index) => {
            const data = responses[index].data;
            // console.log(data);
            if (data && data.username) {
              return { ...user, username: data.username, pfp: data.pfp};
            } else {
              console.log(`Invalid response data for user ${user.following}: ${data}`);
              return user;
            }
          });
          setFollowingUsers(updatedFollowingUsers);
          console.log(updatedFollowingUsers);
        } catch (error) {
          console.log("Error fetching usernames:", error);
        }
      };

      const getUsernames_for_Followers = async () => {
        const requests = followers.map(user => {
          const formData = new FormData();
          formData.append("userid", user.follower);
          return axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getUserInfo.php", formData);
        });
      
        try {
          const responses = await Promise.all(requests);
          const updatedFollowingUsers = followers.map((user, index) => {
            const data = responses[index].data;
            // console.log(data);
            if (data && data.username) {
              return { ...user, username: data.username, pfp: data.pfp};
            } else {
              console.log(`Invalid response data for user ${user.follower}: ${data}`);
              return user;
            }
          });
          setFollowers(updatedFollowingUsers);
          console.log(updatedFollowingUsers);
        } catch (error) {
          console.log("Error fetching usernames:", error);
        }
      };

      
    const removeFollower = () => {
        var formData = new FormData();
        formData.append("follower", sessionStorage.getItem("id"));
        formData.append("following", searchId);
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/removeFollow.php",
            headers: {},
            data: formData
        })
        .then((response) => {

            getFollowingUsers();
            getFollowers();
            setIsAlreadyFollowing(false);
            

        }, (error) => {
            console.log(error);
        });
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
       
        if(!response.data[4]){
            console.log("empty")
            setProfile("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/profilepic.jpg")
        }
        
        }, (error) => {
            setBio("Go to settings to change info")
            setProfile(staticProfile)
            setBackground(staticBackground)
            setName("Mock User")
            
          console.log(error);
        });
  
      
    }

   




 
    let dynamicBackground = {
            backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(32,32,32,1) 43%),url("${background}")`
            
            //  backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(27,27,27,1) 43%),url( 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/basketball(1).jpg')`
    }


    return(
        <div class="bg2">
            
            <div className="bg2abs" style={dynamicBackground}/> 
                <div class="headers">
                <nav class="navbar navbar-expand-lg navbar-dark col-12">
                <img class="navbar-brand" src={img} onClick={() =>navigate("/")} Gym Blog />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col-11" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                    {(searchId == sessionStorage.getItem("id") && (<Link class="nav-item nav-link" to ={`settings`}>Settings</Link>))}
                    <div onClick={()=>navigate(`../../`)}>
                        {(sessionStorage.getItem("id") && (<Link onClick={()=>{signOut()}} class="nav-item nav-link" >Sign Out</Link>))}
                    </div>
                  
                    </div>
                </div>
            </nav>
                           
                    {(searchId !== sessionStorage.getItem("id")) && (sessionStorage.getItem("id")) && (
                            <>
                              {isAlreadyFollowing ? (
                                <button className='unfollow' onClick={removeFollower}>
                                  <div className='unfollowButton'>Unfollow</div>
                                </button>
                              ) : (
                                <button className='follow' onClick={handleFollowUser}>
                                  <div className='followButton'>Follow</div>
                                </button>
                              )}
                              
                              
                            </>
                          )}
                            
                        {(searchId !== sessionStorage.getItem("id")) &&(sessionStorage.getItem("id")) && (
                            
                            <button
                            className='dm'
                            onClick={toggleMessagePopup}>
                            <div className='messageButton'>Message</div>
                            </button>
                            
                        )}
                        
                        </div>
                        <div class="imgbox">
                            
                            <img className='profile' src={profile} />
                        
                        </div>
                    
                        <div class = "name">{name}</div>
                            <div class="desc" >
                            
                            {bio}
                        </div>
                        <div class="buttons">
                            <button className='postwrap' onClick={getPosts}>
                            <div className="post">{posts.length}</div>
                                <div className="postbutton">Posts</div>
                            </button>
                            (<button className='followingwrap' onClick= {toggleFollowingPopup}>
                                <div className="following">{followingUsers.length}</div>
                                <div className="followingbutton">Following</div>
                            </button>)
                            (<button className="followerwrap" onClick={toggleFollowersPopup}>
                                <div className="follower">{followers.length}</div>
                                <div className="followerbutton">Follower</div>
                            </button>)
                            </div>
                           
                        <div className='gallery'>
                            <div className="innerGallery">
                                <Timeline userid = {searchId}/>
                            </div>
                        </div>

                        {showChat && (
                            <div className='chat-popup-container'>
                                <div className='message'>
                                  <h3>Message</h3>
                                </div>
                                <ul className="message-list">
                                  {Array.isArray(messages) && messages.map(message => (
                                    <li key={message.dmid} className={message.sender === parseInt(sessionStorage.getItem("id")) ? 'sent' : 'received'}>
                                       
                                      {message.message}

                                    </li>
                                  ))}
                                </ul>
                                <div className="input-container">
                                  <input
                                    type="text"
                                    placeholder="Enter messages"
                                    value={JustSent}
                                    onChange={event => sentMessages(event.target.value)}
                                  />
                                  <button onClick={sendDM}>Send</button>
                                  <button className="chatbox-close" onClick={toggleMessagePopup}>
                                    Close
                                    </button>
                                </div>
                              
                              </div>
                        )}
                           
                        
                           {showFollowing && (
                        <div className="popup">
                        <div className="popup-inner">
                            <h2>Following</h2>
                            <ul>
                            {Array.isArray(followingUsers) && followingUsers.map((user) => (
                                <li key={user.following}>
                                
                                    <img onClick={()=> {
                                        navigate(`/profile/${user.following}`); 
                                        window.location.reload();
                                    }}src={"https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/" + user.pfp} alt={`${user.username}'s profile`}  />
                                    <span onClick={()=> {
                                        navigate(`/profile/${user.following}`); 
                                        window.location.reload();
                                    }}className="popup-username">{user.username}</span>
                                    
                                    
                                
                                
                                    </li>
                                        ))}
                                        </ul>
                                        <button className="popup-close" onClick={toggleFollowingPopup}>
                                        Close
                                        </button>
                                        </div>
                                        </div>
                                        )}
            
                {showFollowers && (
                            <div className="popup">
                                <div className="popup-inner">
                                <h2>Followers</h2>
                                <ul>
                                {Array.isArray(followers) && followers.map((user) => (
                                <li key={user.follower}>
                                
                                    <img onClick={()=> {
                                        navigate(`/profile/${user.follower}`); 
                                        window.location.reload();
                                    }}src={"https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/" + user.pfp} alt={`${user.username}'s profile`}  />
                                    <span onClick={()=> {
                                        navigate(`/profile/${user.follower}`); 
                                        window.location.reload();
                                    }}className="popup-username">{user.username}</span>
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