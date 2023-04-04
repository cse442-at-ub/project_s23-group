import React from "react";
import FeedPage from "../components/FeedPage";
import "./Timeline.css"


const Timeline = (props) => {
    return (
        <div class = "gallery container-fluid row">
            <FeedPage class ="col-sm-4 "/>
            <FeedPage class ="col-sm-4 "/>
            <FeedPage class ="col-sm-4 "/>
        </div>
    );
        

}


export default Timeline;

