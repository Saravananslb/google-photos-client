import React from 'react';
import { SignIn } from './pages/signIn/SignIn';
import { SignUp } from './pages/signUp/SignUp';
import { Photos } from './pages/photos/Photos';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} ></Route>
        <Route path='/signup' element={<SignUp />} ></Route>
        <Route path='/' element={<Photos />} ></Route>
        <Route path='/:photoTab' element={<Photos />} ></Route>
        <Route path='/:photoTab/:photoId' element={<Photos />} ></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
