import { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import './Settings.css'
import Lottie from "lottie-react";
import loading from "./lotties/loading.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";


//userid - background- profilepic - status
const Settings = () =>{
  
  
    const navigate = useNavigate()
    const [bio, setBio] = useState("")
    const [profile, setProfile] = useState(null);
    const [background, setBackground] = useState(null);
    const [backupbio, setBackupBio] = useState(null)
    const [preview1, setPreview1] = useState("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/"+sessionStorage.getItem("pfp"));
    const [preview2, setPreview2] = useState("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/"+sessionStorage.getItem("background"));
    const [changedimage1, setChangedImage1] = useState(false);
    const [changedimage2, setChangedImage2] = useState(false);
    const [file1, setFile1] = useState(false);
    const [file2, setFile2] = useState(false);
    
    
  
    let back = "/profile/" + sessionStorage.getItem("id")

    useEffect(() => {
      if(!profile){
        setBio(sessionStorage.getItem("bio"))
        setProfile(sessionStorage.getItem("pfp"))
        setBackground(sessionStorage.getItem("background"))
      }
        
    }, [preview1, preview2]);
    
  
    


    

  function uploadPhoto(file) {
    console.log("starting to upload photo");
    var bodyFormData = new FormData();
    bodyFormData.append("myFile", file);
    axios({
      method: "post",
      url:
        "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePost.php",
      headers: { "Content-Type": "multipart/form-data" },
      data: bodyFormData,
    })
      .then((response) => {
        console.log("done uploading " + profile)
        updateDB(bio, profile, background)
       
      })
      .catch((error) => {
        console.log(error);
      });
  }

    const updateDB = (bio, profileName, backgroundName) =>{
      console.log("starting updateDB")

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
        
        
        updatePfp(parseInt(sessionStorage.getItem("id")),profileName)



      }, (error) => {
        console.log(error);
      });

      return "success"
    
  }


  const updatePfp = (userid, profileName) =>{
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
      
      navigate(back)

      }, (error) => {
        console.log(error);
      });

    console.log("Success")
  }

  const notify = () => {
    console.log("called notify")
      toast.warning('File size must be less than 2MB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    
  };
    
    return(
    <div className="bg3">
        <div class='home' onClick={() => navigate(back, { replace: true })}/> 
        
        
        <div className="settings">Settings</div>
        <div className="box">
          <div className="bioBox">
          <input type="text"
              placeholder={bio}
              class="bio" 
              onChange={event => {
                if(event.target.value.trim().length)
                    {setBio(event.target.value)}
                else{
                  setBio(backupbio)
                }
                  
                }}required />
          </div>
          <div className='profileTitle'>Click to change Profile Picture</div>   

          <div className="profileBox">

          <label for="Sprofile" className='SIconBox'>
                    <img className='SPreview' src={preview1} alt="File is too big" />
          </label>    
            
            <input
            className='Sprofile'
            type="file"
            id="Sprofile"
            name="myImage"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={event => {
              console.log(event.target.files[0].size)
              if(event.target.files[0].size <= 2000000){
                console.log(event.target.files[0])
                setPreview1(URL.createObjectURL(event.target.files[0]))
                setFile1(event.target.files[0])
                setProfile(event.target.files[0].name);
                setChangedImage1(true)
              }
              else{
               
               notify()
              }
               
                }}
        />
      
        </div>

        <div className='backgroundTitle'>Click to change Background</div> 
        <div className="backgroundBox">
            
        <label for="Sbackground" className='SIconBox'>
                    <img className='SPreview' src={preview2} alt="File is too big" />
          </label>    


          <input
          className='Sbackground'
          type="file"
          id="Sbackground"
          name="myImage"
          onChange={event => {
            console.log(event.target.files[0].size)
            if(event.target.files[0].size <= 2000000){
              console.log(event.target.files[0])
              setPreview2(URL.createObjectURL(event.target.files[0]))
              setFile2(event.target.files[0])
              setBackground(event.target.files[0].name);
              setChangedImage2(true)
            }
            else{
             
             notify()
            }
             
              }}
        />
        </div>
        
            
            <div className="doneBox">
        <button 
        className='done'
        onClick={() => {
          
            if(changedimage1 && changedimage2){
              console.log("both")
              uploadPhoto(file1)
              uploadPhoto(file2)
            }
            else if(changedimage1){
              console.log("prof")
              uploadPhoto(file1)
            }
            else if(changedimage2){
              console.log("back")
              uploadPhoto(file2)
            }
            else{
              console.log("text")
              updateDB(bio,profile,background)
            }
        }}>
          Done</button>
         
            </div>
        
        
          </div>
          <ToastContainer />
    </div>
        )
}

export default Settings