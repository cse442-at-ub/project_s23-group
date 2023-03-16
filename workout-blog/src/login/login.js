import { logDOM } from '@testing-library/react';
import './login.css';
import downloadImage from './Signin.png';
import { useState } from 'react';


function Login(props) {
  
  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');

  function handleSignIn() {
    // Add code here to handle the sign-in action using the username and password values
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }//temp link
  function forgotPass() {
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }// temp link
  function createAccount() {
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }// temp link
  function log_button() {
    window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
  }// temp link

  return (
    <div className="Login">
      <img id="myImage" src={downloadImage} alt="Login Image"/>
     
      <div className="Signin info">
      <h1>Sign in</h1>
        <div class='usernames'>
          <input type="text"
            placeholder='Username'
            class='username'
            />
        </div>
        <div class='passwords'>
          <input type="password"
            placeholder='Password'
            class='password'
            />
        </div>
        <div>
        </div> 
        <a href="#" class="log_but" onClick={log_button} >Sign in</a>  

        <div class="login-box"> 
  <a href="#" class="forgotpass" onClick={forgotPass}>Forgot your password?</a>  
  <label for="remember-me-checkbox" class="remember-me-label">
    <input type="checkbox" id="remember-me-checkbox" class="remember-me-checkbox"/>
    <span class="checkmark"></span>
    Remember me
  </label>
  </div>
        <a href="#" class="create_account">
        <span class="noAccount">Not yet registered? <a href="#" class="signUp" onClick={() => props.onFormSwitch('register')}>Create an account</a></span>
        </a>
      </div> {/* close "Sign in" div here */}
    </div>
  );
}


export default Login;






