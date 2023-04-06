import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Profile.css'
import staticProfile from './images/profilepic.jpg'
import staticBackground from './images/weights.jpg'
import {
    Link,
    useNavigate,
    useLocation,
  } from "react-router-dom";
  

const Profile = (props) =>{
    const [bio, setBio] = useState('')
    const [profile, setProfile] = useState('');
    const [background, setBackground] = useState('');
    
   



    useEffect(() => {


        if((sessionStorage.getItem("bio") != null) && (sessionStorage.getItem("pfp")!= null) && (sessionStorage.getItem("background")!= null)){
            
            setBio(sessionStorage.getItem("bio"))
            setProfile("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/" + sessionStorage.getItem("pfp"))
            setBackground("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/" + sessionStorage.getItem("background"))
            
        
        }
        else if ((sessionStorage.getItem("bio") == null) && (sessionStorage.getItem("pfp")== null) && (sessionStorage.getItem("background")== null)){
            setBio("Go to settings to change info")
            setProfile(staticProfile)
            setBackground(staticBackground)
            
            getImages()
            
            
        }
        else{
            setBio("Go to settings to change info")
            setProfile(staticProfile)
            setBackground(staticBackground)
        }
    }, []);

    const getImages = () =>{
        var formData = new FormData();
        formData.append("id", parseInt(sessionStorage.getItem("id")));
    
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

        setBio(sessionStorage.getItem("bio"))
        setProfile("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/" + sessionStorage.getItem("pfp"))
        setBackground("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/" + sessionStorage.getItem("background"))
        
        
        }, (error) => {
          console.log(error);
        });
  
      
    }

 
let dynamicBackground = {
        backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(27,27,27,1) 43%),url("${background}")`
        
        //  backgroundImage: `linear-gradient(180deg,transparent, rgba(12,14,21,0.89) 30%, rgba(27,27,27,1) 43%),url( 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/images/basketball(1).jpg')`
   }

  

   
   
   const navigate = useNavigate()

   

    return(
        <div class="bg2">
            <div className="bg2abs" style={dynamicBackground}/> 
                        <div class="headers">
                            <img class='home' onClick={() => navigate("/")} src={require("./images/home.png")}  />
                            {/* <button class='follow'>Follow</button>
                            <button class='message'>Message</button> */}
                            <img class='settings' onClick={() => navigate("/profile/settings")} src={require("./images/settings.png")} />
                        </div>
                        <div class="imgbox">
                            
                            <img className='profile' src={profile} />
                        
                        </div>
                    
                        <div class = "name">Mock User</div>
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
                            <button className='followingwrap' onClick={() =>{console.log("following")}}>
                                <div className="following">
                                    1290 
                                </div>
                                <div className="followingbutton">
                                    Following
                                </div>
                            </button>
                            <button className='followerwrap' onClick={() =>{console.log("follower")}}>
                                <div className="follower">
                                    1290 
                                </div>
                                <div className="followerbutton">
                                    Follower
                                </div>
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
                  
                        

            
        </div>

    )

}

export default Profile