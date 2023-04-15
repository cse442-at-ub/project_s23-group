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
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
    const [showAlreadyFollowingPopup, setShowAlreadyFollowingPopup] = useState(false);

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
    const userIds = followingUsers.map(user => user.following);




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

    useEffect(() => {
        setIsAlreadyFollowing(userIds.includes(searchId));
      }, [followingUsers]);

    useEffect(() => {
        setIsFollowing(isAlreadyFollowing);
    },[isAlreadyFollowing]);


    // follow feature
    const handleFollowUser = () => {
        const formData = new FormData();
        formData.append("follower", sessionStorage.getItem("id"));
        formData.append("following", searchId);

        if (userIds.includes(searchId)) {
            setShowAlreadyFollowingPopup(true);
            return;
        }
        axios({
            method: 'post',
            url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makeFollow.php",
            headers: {},
            data: formData
        })
        .then((response) => {
            setIsAlreadyFollowing(true);
            // const newFollowingUsers = [...followingUsers, {id: searchId, name: name}];
            // setFollowingUsers(newFollowingUsers);
            getFollowingUsers();
            getFollowers();
            
        }, (error) => {
            console.log(error);
        });
    }

    const AlreadyFollowingPopup = ({ onClose }) => {
        return (
            <div className="popup">
                <div className="popup-content">
                    <h3>Already following this user</h3>
                    <button onClick={onClose}>OK</button>
                </div>
            </div>
        );
    };
    
    // get following list from the database
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
            console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].length === 0) {
                    response.data.splice(i, 1);
                    i--;
                }
                }
            
                
            setFollowingUsers(response.data);
            getUsernames();
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
            console.log(response.data)
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

    const isFollowingUser = () => {
        const followingID = followingUsers.map(user => user.following);
        return followingID.includes((searchId))
    }
        
    const getUsernames = async () => {
        const requests = followingUsers.map(user => {
          const formData = new FormData();
          formData.append("id", user.following);
          return axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/profileGet.php", formData);
        });
      
        try {
          const responses = await Promise.all(requests);
          console.log(responses[1].data);
          const updatedFollowingUsers = followingUsers.map((user, index) => {
            const data = responses[index].data;
            console.log(data);
            if (data && data[1]) {
              return { ...user, username: data[1] };
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

    // useEffect(() => {
    //     getUsernames();
    // }, [followingUsers]);

    useEffect(() => {
        getFollowingUsers();
        getFollowers();
        isFollowingUser();
    }, []);

    const handleGetFollowing = () => {
        getFollowingUsers(); 
        setShowFollowing(true); 
    }
    
    const handleGetFollowers = () => {
        setShowFollowers(true); 
        getFollowers(); 
    }

 
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
                           {(searchId !== sessionStorage.getItem("id")) && (
                            
                            <button
                            className='follow'
                            onClick={() => {
                                if (!isFollowing) {
                                handleFollowUser();
                                }
                                setIsFollowing(!isFollowing);
                            }}
                            disabled={isFollowing || isAlreadyFollowing}
                            >
                            {isAlreadyFollowing ? "Follow" : isFollowing ? "Follow" : "Follow"}
                            </button>
                            
                        )}
                        {showAlreadyFollowingPopup && <AlreadyFollowingPopup onClose={() => setShowAlreadyFollowingPopup(false)} />}

                        {/* {(searchId !== sessionStorage.getItem("id")) && (!isFollowing ? (
                            <button className="follow-btn" onClick={handleFollowUser}>Follow</button>
                        ) : (
                            <button className="follow-btn following" onClick={toggleFollowingPopup} disabled>Following</button>
                        ))} */}
                            
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
                            {(searchId == sessionStorage.getItem("id")) && (<button className='followingwrap' onClick= {handleGetFollowing}>
                                <div className="following">{followingUsers.length}</div>
                                <div className="followingbutton">Following</div>
                            </button>)}
                            {(searchId == sessionStorage.getItem("id")) && (<button className="followerwrap" onClick={handleGetFollowers}>
                                <div className="follower">{followers.length}</div>
                                <div className="followerbutton">Follower</div>
                            </button>)}
                            </div>
                            <div className="timeline">
                            Timeline
                        </div>
                        <div className='gallery'>
                            <div className="innerGallery">
                            <img  src={require("./images/bike.jpg")} />
                            <img  src={require("./images/basketball.jpg")} />
                            <img  src={require("./images/weights.jpg")} />
                            <img  src={require("./images/box.jpg")} />
                            <img  src={require("./images/run.jpg")} />
                            <img  src={require("./images/tennis.jpg")} />
                            <img  src={require("./images/weights2.jpg")} />
                            </div>
                        </div>
                           
                        
                        {showFollowing && (
                        <div className="popup">
                        <div className="popup-inner">
                            <h2>Following</h2>
                            <ul>
                            {Array.isArray(followingUsers) && followingUsers.map((user) => (
                                <li key={user.following}>
                                
                                    {/* <img onClick={()=> {
                                        navigate(`/profile/${user.following}`); 
                                        window.location.reload();
                                    }}src={user.following} alt={`${user.following}'s profile`}  /> */}
                                    <span onClick={()=> {
                                        navigate(`/profile/${user.following}`); 
                                        window.location.reload();
                                    }}className="popup-username">{`${user.following}'s profile`}</span>
                                    
                                    
                                
                                
                                {/* <Link to={`profile/${user.following}`}>{user.following}</Link> */}
                             {/* <button
                            className="popup-remove"
                            onClick={() => handleRemoveUser(user.id)}
                            >
                            Remove
                            </button> */}
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
                                {Array.isArray(followingUsers) && followers.map((user) => (
                                <li key={user.follower}>
                                
                                    {/* <img onClick={()=> {
                                        navigate(`/profile/${user.following}`); 
                                        window.location.reload();
                                    }}src={user.following} alt={`${user.following}'s profile`}  /> */}
                                    <span onClick={()=> {
                                        navigate(`/profile/${user.follower}`); 
                                        window.location.reload();
                                    }}className="popup-username">{`${user.follower}'s profile`}</span>
                                    {/* <button
                                    className="popup-remove"
                                    onClick={() => handleRemoveFollower(follower.id)}
                                    >
                                    Remove
                                    </button> */}
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