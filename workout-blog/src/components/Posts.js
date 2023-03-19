import React from 'react'
import './Posts.css'
import image from "../Image/cbum.jpg"
import basketball from "./images/basketball.jpg"
import likeButton from "./images/fitness-facilities.png"


function Posts() {
  return (
    <section class="main">
    <div class="left-col">
    <div class= "wrapper">
    <div class="post">
        <img src={basketball} class="post-image" alt=""></img>
        <div class="info">
            <div class="user">
                <div class="profile-pic">
                    <img src={image} />

                </div>
                <p class="username">
                     username
                </p>

            </div>
            <div class="post-content">
                <div class="reaction-wrapper">
                    <img src={likeButton} class="icon" alt=''></img>
                    <p class="likes">365 likes</p>
                    <p class="description">Put in Description</p>
                    <p class="post-time">3.17.2023</p>

                </div>
                

            </div>
        </div>
        
        
    </div>

    </div>
    </div>
    </section>

    

  );
            
            
  
}

export default Posts