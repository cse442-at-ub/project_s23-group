<<<<<<< HEAD
import React, { useState } from 'react';
import Login from './components/login.js';
import Register from './components/Register';
import Home from './components/Home_Page';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [form, setForm] = useState(null);

  const handleFormSwitch = (newForm) => {
    setForm(newForm);
  };

  let content = null;
  if (form === 'login') {
    content = <Login onFormSwitch={handleFormSwitch} />;
  } else if (form === 'register') {
    content = <Register onFormSwitch={handleFormSwitch} />;
  } else if (form === 'profile') {
    content = <Profile onFormSwitch={handleFormSwitch} />;
  } 
  else if (form === 'home') {
    content = <Home onFormSwitch={handleFormSwitch} />;
  } 
  else {
    content = <Home onFormSwitch={handleFormSwitch} />;
  }

  return <div className="App">{content}</div>;
}

export default App;
=======
import React, { useState } from 'react';
import Login from './components/login.js';
import Register from './components/Register.js';
import Home from './components/Home_Page.js';
import ProfilePage from './components/Profile.js';
import Settings from './components/Settings.js';
import { NotFound } from './components/NotFound.js';
import {
  BrowserRouter, Link,Router,Routes,Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
   
      <Routes>
          <Route path="/">
          <Route index element={<Home />}/>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile">
            <Route index element={<ProfilePage />}/>
            <Route path="settings" element={<Settings />} />
          </Route> 
          <Route path="*" element={<NotFound />} />
          </Route>
       
      </Routes>
   

  );
}

export default App;
>>>>>>> origin/settings
