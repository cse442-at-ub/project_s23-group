import React from "react";
import FeedPage from "../components/FeedPage";
import image from "./images/cbum.jpg"

import "./Timeline.css"


const Timeline = (props) => {

    return (
        <div class = "gallery container-fluid row">
            {

            }
            <FeedPage profile_picture = {image}  post_image = {image} class ="col-sm-4 "/>
        </div>
    );
        

}


export default Timeline;

