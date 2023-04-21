import { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import './PostSettings.css'
import Lottie from "lottie-react";
import loading from "./lotties/loading.json"
import {
  useNavigate,
  useParams,
} from "react-router-dom";



const PostSettings = (props) =>{
  
  
    const navigate = useNavigate()
    const [title, setTitle] = useState(null)
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState(null);
    const [tag, setTag] = useState('Diet');
    const params = useParams()
    const postid = params.id
    const [load, setLoad] = useState(false)
    
    
    
  
   

    useEffect(() => {
        console.log(tag)
      }, [tag]);

    function uploadPhoto() {
        console.log("starting to upload photo");
        var bodyFormData = new FormData();
        bodyFormData.append("myFile", image);
        axios({
          method: "post",
          url:
            "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePost.php",
          headers: { "Content-Type": "multipart/form-data" },
          data: bodyFormData,
        })
          .then((response) => {
            
            EditPost(title,image,caption,tag)
          })
          .catch((error) => {
            console.log(error);
          });
      }

    const EditPost = ( title, image, caption, tag) =>{
        var formData = new FormData();
        formData.append("postid", postid);
        formData.append("title", title);
        formData.append("image", image);
        formData.append("caption",caption);
        formData.append("tag",tag);
        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/",
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

    const deletePost = ( ) =>{
        var formData = new FormData();
        formData.append("postid", postid);
   
        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/deletePost.php",
          headers: {'Content-Type': 'multipart/form-data'}, 
          data: formData
        })
        .then((response) => {
          console.log(response);
          navigate("/")
          
  
  
        }, (error) => {
          console.log(error);
        });
  
      console.log("Success")
    }

   
    
    return(
        <div className="PS">
           <div className="PSHomeBox">
            <button 
                className="PSHome"
                onClick={()=>navigate("/")}>
                    Home
                
                </button>
           </div>
           <div className="PSFilter">
                <select
                    className="custom-select"
                    value={tag}
                    onChange={(e) => {
                    const selected = e.target.value;
                    setTag(selected);
                    }}
                >
                    <option value="Diet">Diet</option>
                    <option value="Progress">Progress</option>
                    <option value="Max Weight">Max Weight</option>
                </select>
                {tag}
         </div>
           <div className="PSTitleBox">
                <input
                    className='inpTitle'
                    type='text'
                    onChange={event => {
                        setTitle(event.target.value)
                        }}
                    />
           </div>
           <div className="PSImgBox">
                <input
                    className='inpImg'
                    type='file'
                    onChange={event => {
                        setImage(event.target.value)
                        }}
                    />
           </div>
           <div className="PSCaptionBox">
                <input
                    className='inpCaption'
                    type='text'
                    onChange={event => {
                        setCaption(event.target.value)
                        }}
                    />
           </div>
           <div className="PSUpdateBox">
                <button className="PSUpdate"
                onClick={()=>{}}
                >Update</button>
           </div>
           <div className="PSDeleteBox">
                <button className="PSDelete"
                onClick={()=>{deletePost()}}
                >Delete</button>
           </div>
        </div>
        )
}

export default PostSettings