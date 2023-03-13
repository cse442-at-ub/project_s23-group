<<<<<<< HEAD
import './App.css';
import downloadImage from './download.jpg';

=======
import logo from './logo.svg';
import React from 'react';
import './App.css';
import Home_Page from './Home_Page';
>>>>>>> homepage
function App() {
  function handleSignIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Add code here to handle the sign-in action using the username and password values
    //First take the username and check if thats in the database
    //If it is then check the password of that username and if it matches the password typed by the user bring them to their account
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }//temp link
  function forgotPass() {
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }// temp link
  function createAccount() {
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }// temp link

  return (
<<<<<<< HEAD
    <div className="App">
      <img id="myImage" src={downloadImage} alt="Login Image"/>
      <div className="Sign in">
        <h1>Sign in</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br />
        <button onClick={handleSignIn}>Sign in</button>
        <button onClick={forgotPass}>Forgot your password?</button>
        <button onClick={createAccount}>Dont have an Account? Create one!</button>      
        </div>
=======
    <div className='container-fluid'>
      <Home_Page />
>>>>>>> homepage
    </div>
  );
}

export default App;

