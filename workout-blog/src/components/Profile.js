import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Profile.css'
import Timeline from './Timeline.js'


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
                            <div class="desc" ></div>
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
                        <Timeline/>
                  
                        

            
        </div>

    )

}

export default Profile