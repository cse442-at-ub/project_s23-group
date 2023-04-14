import React, { useState } from 'react';
import Login from './components/login.js';
import Register from './components/Register.js';
import Home from './components/Home_Page.js';
import ProfilePage from './components/Profile.js';
import Settings from './components/Settings.js';
<<<<<<< HEAD
import Post from './components/makePost.js';
=======
>>>>>>> cc8a46149be90aa858e1bbe511273a1c118af758
import { NotFound } from './components/NotFound.js';
import {
  BrowserRouter, Link,Router,Routes,Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
   
      <Routes>
<<<<<<< HEAD
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
=======
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
       
>>>>>>> cc8a46149be90aa858e1bbe511273a1c118af758
      </Routes>
   

  );
}

export default App;
