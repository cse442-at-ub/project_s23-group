import React, { useState } from 'react';
import Login from './components/login.js';
import Register from './components/Register.js';
import Home from './components/Home_Page.js';
import ProfilePage from './components/Profile.js';
import Settings from './components/Settings.js';
import MakePost from './components/makePost.js';
import { NotFound } from './components/NotFound.js';
import {
  BrowserRouter, Link,Router,Routes,Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
   
      <Routes>
          <Route path="/" >
            <Route index element={<Home />}/>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profile">
              <Route path=":id" element={<ProfilePage />} />
              <Route path=":id/settings" element={<Settings />} />
              </Route>
            <Route path="/makepost" element={<MakePost />} />
          
          </Route>
      </Routes>
   

  );
}

export default App;
