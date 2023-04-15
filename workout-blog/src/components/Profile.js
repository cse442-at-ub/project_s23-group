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
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
    const [showAlreadyFollowingPopup, setShowAlreadyFollowingPopup] = useState(false);

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

    // const handleGetFollowing = () => {
    //     getFollowingUsers(); 
    //     setShowFollowing(true); 
    // }
    
    // const handleGetFollowers = () => {
    //     setShowFollowers(true); 
    //     getFollowers(); 
    // }

    // const handleRemoveUser = (id) => {
    //     const updatedUsers = followingUsers.filter(user => user.id !== id);
    //     setFollowingUsers(updatedUsers);
    // };

    // const handleRemoveFollower = (id) => {
    //     const updatedFollowers = followers.filter(follower => follower.id !== id);
    //     setFollowers(updatedFollowers);
    //   };



    const searchId = params.id
    const userIds = followingUsers.map(user => user.following);




    useEffect(() => {
      
            console.log("2")
            getImages()
            getFollowingUsers();
            getFollowers();
            getNumPosts();
        
    }, []);

    const signOut = () => {
        sessionStorage.clear();
        setBio('')
        setProfile(null)
        setBackground(null)
        navigate("/")
    }

    useEffect(() => {
        setIsAlreadyFollowing(userIds.includes(searchId));
      }, [followingUsers]);

    useEffect(() => {
        setIsFollowing(isAlreadyFollowing);
    },[isAlreadyFollowing]);

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
            getUsernames();
            
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

    const isFollowingUser = () => {
        const followingID = followingUsers.map(user => user.following);
        return followingID.includes((searchId))
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
    // },[]);





 
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
                    {(searchId == sessionStorage.getItem("id") && (<Link class="nav-item nav-link" to ={`settings`}>Settings</Link>))}
                    {(sessionStorage.getItem("id") && (<Link onClick={()=>signOut()} class="nav-item nav-link" >Sign Out</Link>))}
                  
                    </div>
                </div>
            </nav>
                           
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
                            <div className="timeline">
                            Timeline
                        </div>
                        <div className='gallery'>
                            <div className="innerGallery">
                                <Timeline userid = {searchId}/>]
                            </div>
                        </div>
                           
                        
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