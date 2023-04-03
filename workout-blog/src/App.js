import React, { useState } from 'react';
import Login from './components/login.js';
import Register from './components/Register';
import Home from './components/Home_Page';
import Profile from './components/Profile';
import Settings from './components/Settings';
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
  else if (form === 'settings') {
    content = <Settings onFormSwitch={handleFormSwitch} />;
  }  
  else {
    content = <Home onFormSwitch={handleFormSwitch} />;
  }

  return <div className="App">{content}</div>;
}

export default App;
