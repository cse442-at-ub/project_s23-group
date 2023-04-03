import React from "react";
import FeedPage from "../components/FeedPage";
import "./Timeline.css"


const Timeline = (props) => {
    return (
        <div>
            <div id="timeline">Timeline</div>
            <div className="Gallery">
                <FeedPage/>
            </div>
        </div>
    );
        

}


export default Timeline;

