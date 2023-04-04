import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Settings.css'

//userid - background- profilepic - status
const Settings = (props) =>{
    
    const [bio, setBio] = useState('')
    const [profile, setProfile] = useState(null);
    const [background, setBackground] = useState(null);

    useEffect(() => {
        console.log(profile)
        console.log(background)
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
          console.log(response);
          

        }, (error) => {
          console.log(error);
        });

      
    }

    const updateDB = (bio, profile, background) =>{
      var formData = new FormData();
      formData.append("id", 14);
      formData.append("bio", bio);
      formData.append("pfp", profile);
      formData.append("background", background);
      axios({
        method: 'put',
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
        <div onClick={() => props.onFormSwitch('profile')}> Back </div>   
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
        props.onFormSwitch('profile')


      }}>
        Done</button>

    </div>
        )
}

export default Settings