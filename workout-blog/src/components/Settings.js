import { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import './Settings.css'
import Lottie from "lottie-react";
import loading from "./lotties/loading.json"
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";


//userid - background- profilepic - status
const Settings = (props) =>{
  
  
    const navigate = useNavigate()
    const [bio, setBio] = useState('')
    const [profile, setProfile] = useState(null);
    const [background, setBackground] = useState(null);

    const [load, setLoad] = useState(false)
    
  
    let back = "/profile/" + sessionStorage.getItem("id")

    useEffect(() => {
   
      }, [profile,background]);
    


    

    const uploadServerImages = (profile, background) =>{
        var formData = new FormData();
        formData.append("pfp", profile);
        formData.append("background", background);
        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/profileServer.php",
          headers: {'Content-Type': 'multipart/form-data'}, 
          data: formData
        })
        .then((response) => {
          sessionStorage.setItem("bio", bio)
          sessionStorage.setItem("pfp", response.data[0])
          sessionStorage.setItem("background", response.data[1])
          
          console.log("checking")
          console.log(response.data[0] + "is pfp")
          console.log(response.data[1] + "is background")
         
          updateDB(bio,response.data[0],response.data[1])
         

        }, (error) => {
          console.log(error);
        });

      
    }

    const updateDB = (bio, profileName, backgroundName) =>{
      var formData = new FormData();
      formData.append("id", parseInt(sessionStorage.getItem("id")));
      formData.append("username", sessionStorage.getItem("name"));
      formData.append("bio", bio);
      formData.append("pfp",profileName);
      formData.append("background",backgroundName);
      axios({
        method: 'post',
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/profileDB.php",
        headers: {'Content-Type': 'multipart/form-data'}, 
        data: formData
      })
      .then((response) => {
        console.log(response);
        
        updatePost(parseInt(sessionStorage.getItem("id")),profileName)


      }, (error) => {
        console.log(error);
      });

    console.log("Success")
  }


  const updatePost = (userid, profileName) =>{
    var formData = new FormData();
    formData.append("userid", userid);
    formData.append("pfp",profileName);
    axios({
      method: 'post',
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/updatePost.php",
      headers: {'Content-Type': 'multipart/form-data'}, 
      data: formData
    })
    .then((response) => {
      console.log(response);
      setLoad(false)
      navigate(back)

      }, (error) => {
        console.log(error);
      });

    console.log("Success")
  }
    
    return(
    <div className="bg3">
        <div class='home' onClick={() => navigate(back, { replace: true })}/> 
        
        <div className="box">
        <div className="settings">Settings</div>
        <div className="bioBox">
        <input type="text"
            placeholder="Update Bio"
            class="bio" 
            onChange={event => {
            setBio(event.target.value)
            }} required />
        </div>
        <div className='profileTitle'>Set Profile Picture</div>   

        <div className="profileBox">
           
          <input
          className='profile'
          type="file"
      
          name="myImage"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={(event) => {
          
            setProfile(event.target.files[0]);
            
          }}
      />
     
      </div>

      <div className='backgroundTitle'>Set Background</div> 
      <div className="backgroundBox">
          
        <input
        className='background'
        type="file"
        name="myImage"
        onChange={(event) => {
        
          setBackground(event.target.files[0]);
          
        }}
      />
      </div>
      
           
          <div className="doneBox">
      <button 
      className='done'
      onClick={() => {
        
        if((bio != '') && (profile != null)&& (background != null) ){
          setLoad(true)
          uploadServerImages(profile,background)
          setBio('')
          setProfile(null)
          setBackground(null)
          
        }
        else{
          navigate(back)
        }
      }}>
        Done</button>
        {load && (<div className='animation'>
          <Lottie className='circle' animationData={loading} loop={true} />
          </div>)}
          </div>
        
        
          </div>
    </div>
        )
}

export default Settings