import React, { useState } from 'react';
import Login from '/Users/erictomiello/Desktop/School code/442 code/project_s23-group/workout-blog/src/login/login.js';
import Register from './components/Register';
import Home from './home/Home_Page';
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
  } else {
    content = <Home onFormSwitch={handleFormSwitch} />;
  }

  return <div className="App">{content}</div>;
}

export default App;
