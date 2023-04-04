import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import image from "./images/cbum.jpg"
import './Profile.css'

const Profile = (props) => {
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([
        { id: 1, name: 'Mock User 1', profilePic: require('./images/profilepic.jpg') },
        { id: 2, name: 'Mock User 2', profilePic: require('./images/profilepic.jpg') },
        { id: 3, name: 'Mock User 3', profilePic: require('./images/profilepic.jpg') },
        { id: 4, name: 'Mock User 4', profilePic: require('./images/profilepic.jpg') },
    ]);

    const [followers, setFollowers] = useState([
        { id: 1, name: 'Mock User 4', profilePic: require('./images/profilepic.jpg') },
        { id: 2, name: 'Mock User 5', profilePic: require('./images/profilepic.jpg') },
        { id: 3, name: 'Mock User 6', profilePic: require('./images/profilepic.jpg') },
      ]);
  
    const toggleFollowingPopup = () => {
      setShowFollowing(!showFollowing);
    };
  
    const toggleFollowersPopup = () => {
      setShowFollowers(!showFollowers);
    };

    const handleRemoveUser = (id) => {
        const updatedUsers = followingUsers.filter(user => user.id !== id);
        setFollowingUsers(updatedUsers);
    };

    const handleRemoveFollower = (id) => {
        const updatedFollowers = followers.filter(follower => follower.id !== id);
        setFollowers(updatedFollowers);
      };


  
    return (
      <div className="bg2">
        <div className="headers">
          <img
            className="home"
            onClick={() => props.onFormSwitch('home')}
            src={require('./images/home.png')}
          />
        </div>
        <div className="imgbox">
          <img className="profile" src={require('./images/profilepic.jpg')} />
        </div>
        <div className="name">Mock User</div>
        <div className="desc">Mock Bio</div>
        <div className="buttons">
          <button className="postwrap" onClick={() => console.log('posts')}>
            <div className="post">1290</div>
            <div className="postbutton">Posts</div>
          </button>
          <button className="followingwrap" onClick={toggleFollowingPopup}>
            <div className="following">{followingUsers.length}</div>
            <div className="followingbutton">Following</div>
          </button>
          <button className="followerwrap" onClick={toggleFollowersPopup}>
            <div className="follower">{followers.length}</div>
            <div className="followerbutton">Follower</div>
          </button>
        </div>
        <div className="timeline">Timeline</div>
        <div className="gallery">
          <img src={require('./images/bike.jpg')} />
          <img src={require('./images/basketball.jpg')} />
          <img src={require('./images/weights.jpg')} />
          <img src={require('./images/box.jpg')} />
          <img src={require('./images/run.jpg')} />
          <img src={require('./images/tennis.jpg')} />
          <img src={require('./images/weights2.jpg')} />
        </div>
  
        {/* Following popup */}
        {showFollowing && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Following</h2>
            <ul>
              {followingUsers.map((user) => (
                <li key={user.id}>
                  <img src={user.profilePic} alt={`${user.name}'s profile`} />
                    <span className="popup-username">{user.name}</span>
                    {user.name}
                    
                <button
                className="popup-remove"
                onClick={() => handleRemoveUser(user.id)}
                >
                Remove
                </button>
                </li>
                ))}
                </ul>
                <button className="popup-close" onClick={toggleFollowingPopup}>
                Close
                </button>
                </div>
                </div>
                )}
  
        {/* Followers popup */}
        {showFollowers && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Followers</h2>
              <ul>
                {followers.map((follower) => (
                <li key={follower.id}>
                  <img
                    src={follower.profilePic}
                    alt={`${follower.name}'s profile`}
                    />
                <span className="popup-username">{follower.name}</span>
                <button
                className="popup-remove"
                onClick={() => handleRemoveFollower(follower.id)}
                >
                Remove
                </button>
                </li>
                ))}
                </ul>
                <button className="popup-close" onClick={toggleFollowersPopup}>
                Close
                </button>
                </div>
                </div>
                )}
                </div>
    );
};
  
  export default Profile;
            

        

