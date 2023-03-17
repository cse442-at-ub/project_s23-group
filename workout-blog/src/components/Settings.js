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
    

    const updateSettings = (bio, profile, background) =>{
        var formData = new FormData();
        formData.append("bio", bio);
        formData.append("profile", profile);
        formData.append("background", background);
        axios.put('upload_file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    
    return(
    <div className="bg3">
        
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

      <button>Done</button>

    </div>
        )
}

export default Settings