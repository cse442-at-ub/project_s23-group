import React, { useState } from 'react';
import Login from './components/login.js';
import Register from './components/Register.js';
import Home from './components/Home_Page.js';
import ProfilePage from './components/Profile.js';
import Settings from './components/Settings.js';
import Post from './components/MakePost.js';
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
            <Route path="posts" element={<Post />} />
            <Route path="login" element={<Login />} />
            <Route path="profile">
              <Route path=":id" element={<ProfilePage />} />
              <Route path=":id/settings" element={<Settings />} />
              </Route>
            <Route path="*" element={<NotFound />} />
          
          </Route>
      </Routes>
   

  );
}

export default App;
