import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Profile.css'


const Profile = (props) =>{
   
    

    return(
        <div class="bg2">
                        <div class="headers">
                            <img class='home' onClick={() => props.onFormSwitch('home')} src={require("./images/home.png")}  />
                            {/* <button class='follow'>Follow</button>
                            <button class='message'>Message</button>
                            <img class='settings' onclick={()=>{console.log("home")}} src={require("./images/settings.png")} /> */}
                        </div>
                        <div class="imgbox">
                            
                            <img className='profile' src={require("./images/profilepic.jpg")} />
                        
                        </div>
                    
                        <div class = "name">Mock User</div>
                            <div class="desc" >
                            
                            Mock Bio
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