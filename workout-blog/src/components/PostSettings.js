import { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import './PostSettings.css'
import Lottie from "lottie-react";
import loading from "./lotties/loading.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useNavigate,
  useParams,
} from "react-router-dom";



const PostSettings = ({alert}) =>{
  
  
    const navigate = useNavigate()
    const [title, setTitle] = useState(null)
    const [myFile, setMyFile] = useState(null);
    const [text, setText] = useState(null);
    const [tag, setTag] = useState(null);
    const [backuptitle, setBackUpTitle] = useState(null)
    const [backupFile, setBackUpFile] = useState(null)
    const [changedimage, setChangedImage] = useState(false);
    const [backupcaption, setBackUpCaption] = useState(null);
    const [preview, setPreview] = useState(null);
    const params = useParams()
    const postid = params.id
    const [load, setLoad] = useState(false)
    
    
    
  
   

    useEffect(() => {
      if(title == null){
        getBlogPost()
      }
        
      }, [myFile]);


      function getBlogPost() {
        var formData = new FormData();   
        formData.append("postid", postid); 
        axios({
          method: 'POST',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/getSinglePost.php",
          data: formData,
        })
          .then(response => {
            
            setTitle(response.data.title)
            setMyFile(response.data.img)
            setText(response.data.text)
            setTag(response.data.tag)
            setBackUpTitle(response.data.title)
            setBackUpCaption(response.data.text)
            setBackUpFile(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${response.data.img}`)
            setPreview(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/uploads/${response.data.img}`)
          
            
        })
          .catch(error => {
            console.log(error);
          });
      }
    

    function uploadPhoto() {
        console.log("starting to upload photo");
        var bodyFormData = new FormData();
        bodyFormData.append("myFile", myFile);
        axios({
          method: "post",
          url:
            "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/makePost.php",
          headers: { "Content-Type": "multipart/form-data" },
          data: bodyFormData,
        })
          .then((response) => {
            
            EditPost(title,text,response.data[0],tag)
           
          })
          .catch((error) => {
            console.log(error);
          });
      }

    const EditPost = ( title, text, image, tag) =>{
      
        var formData = new FormData();
        formData.append("postid", postid);
        formData.append("title", title);
        formData.append("img", image);
        formData.append("text",text);
        formData.append("tag",tag);
        axios({
          method: 'post',
          url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442w/editPost.php",
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
        <div className="PS">
          
            <button 
                className="home"
                onClick={()=>navigate("/")}/>
          
           <div className="PSHeader">Post Editor</div>

           <div className="PSCard">
           <div className="PSFilterBox">
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
                  
            </div>
           </div>
           {/* <div className="PSTitle">Title</div> */}
           <div className="PSTitleBox">
                <input
                    className='inpTitle'
                    type='text'
                    placeholder={title}
                    onChange={event => {
                        if(event.target.value.trim().length)
                            {setTitle(event.target.value)}
                        else{
                          setTitle(backuptitle)
                        }
                          
                        }}
                    />
           </div>
           <div className="PSImgBox">
                
                
                <label for="inpImg" className='PSIconBox'>
                    <img className='PSPreview' src={preview} alt="File is too big" />
                </label>        
             
                <input
                    id='inpImg'
                    type='file'
                    className='inpImg'
                    accept=".jpg, .jpeg, .png"
                    onChange={event => {
                      console.log(event.target.files[0].size)
                      if(event.target.files[0].size <= 2000000){
                        console.log(event.target.files[0])
                        setPreview(URL.createObjectURL(event.target.files[0]))
                        setMyFile(event.target.files[0]);
                        setChangedImage(true)
                      }
                      else{
                       
                       notify()
                      }
                       
                        }}
                    />
           </div>
           {/* <div className="PSCaption">Caption</div> */}
           <div className="PSCaptionBox">
                <textarea
                    className='inpCaption'
                    type='text'
                    value={text}
                    onChange={event => {
                      if(event.target.value.trim().length)
                            {setText(event.target.value)}
                        else{
                          setText(backupcaption)
                        }
                        }}
                    />
           </div>
           <div className="PSUpdateBox">
                <button className="PSUpdate"
                onClick={()=>{
                  if(changedimage){
                    uploadPhoto()
                  }
                  else{
                   
                    EditPost(title, text, myFile, tag)
                  }
                  
                }}
                >Update</button>
           </div>
           <div className="PSDeleteBox">
                <button className="PSDelete"
                onClick={()=>{deletePost()}}
                >Delete</button>
           </div>
           </div>
           <ToastContainer />
        </div>
        )
}

export default PostSettings