import React, { useState } from 'react';
import Login from '/Users/erictomiello/Desktop/School code/442 code/project_s23-group/workout-blog/src/login/login.js';
import Register from './components/Register';
import './App.css';

function App() {
  const [form, setForm] = useState('login');

  const handleFormSwitch = (newForm) => {
    setForm(newForm);
  }

  return (
    <div className="App">
      {form === 'login' ? <Login onFormSwitch={handleFormSwitch} /> : <Register onFormSwitch={handleFormSwitch} />}
    </div>
  );
}

export default App;
