import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element={<Home /> } />
            <Route path = "/signup" element={<SignUp />} />
            <Route path = '/login' element ={<LogIn />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App
