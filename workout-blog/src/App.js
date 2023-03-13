import './App.css';
import downloadImage from './download.jpg';
import Register from './components/Register'
import Profile from './components/Profile'
function App() {
  return(<Profile/>)
//   function handleSignIn() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     // Add code here to handle the sign-in action using the username and password values
//     //First take the username and check if thats in the database
//     //If it is then check the password of that username and if it matches the password typed by the user bring them to their account
//     window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
//   }//temp link
//   function forgotPass() {
//     window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
//   }// temp link
//   function createAccount() {
//     window.location.href = "https://ublearns.buffalo.edu/?new_loc=%2Fultra%2Finstitution-page";
//   }// temp link

//   return (
//     <div className="App">
//       <img id="myImage" src={downloadImage} alt="Login Image"/>
//       <div className="Sign in">
//         <h1>Sign in</h1>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" />
//         <br />
//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" name="password" />
//         <br />
//         <button onClick={handleSignIn}>Sign in</button>
//         <button onClick={forgotPass}>Forgot your password?</button>
//         <button onClick={createAccount}>Dont have an Account? Create one!</button>      
//         </div>
//     </div>
//   );
}

export default App;

