import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Settings.css'
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
    // const [profileName, setProfileName] = useState('');
    // const [backgroundName, setBackgroundName] = useState('');

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
        

      }, (error) => {
        console.log(error);
      });

    console.log("Success")
  }
    
    return(
    <div className="bg3">
        <div onClick={() => navigate("/CSE442-542/2023-Spring/cse-442w/test2/profile", { replace: true })}> Back </div>   
        <div className="biobox">
        <input type="text"
            placeholder="Update Bio"
            class="bio" 
            onChange={event => {
            setBio(event.target.value)
            }} required />
        </div>

        <div className="profilebox">
        <div>Profile Picture</div>    
        <input
        type="file"
        name="myImage"
        accept="image/x-png,image/gif,image/jpeg"
        onChange={(event) => {
        
          setProfile(event.target.files[0]);
          
        }}
      />
      </div>
      <div className="backgroundbox">
        <div>Background Image</div>    
        <input
        type="file"
        name="myImage"
        onChange={(event) => {
        
          setBackground(event.target.files[0]);
          
        }}
      />
      </div>

      <button 
      onClick={() => {
        uploadServerImages(profile,background)
        // navigate("/CSE442-542/2023-Spring/cse-442w/test2/profile")


      }}>
        Done</button>

    </div>
        )
}

export default Settings