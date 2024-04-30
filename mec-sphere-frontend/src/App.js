import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Layout from './Layout';
import Placements from './Pages/Placements';
import Alumniconnect from './Pages/Alumniconnect';
import Users from './Pages/Users';
import QA from './Pages/QA';
import Profile from './Pages/Profile';
import { ChakraProvider } from '@chakra-ui/react';
import Signup from './Pages/Signup';
import Friends from './Pages/Friends'
import Requests from './Pages/Requests'
import UserChat from './Pages/UserChats';
import Login from './Pages/Login';


function App() {
  return (
      <ChakraProvider>
        <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="/dash/*" element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path="placements" element={<Placements/>} />
          <Route path="alumniconnect" element={<Alumniconnect/>} />
          <Route path="qa" element={<QA/>} />
          
          <Route path='profile' element={<Profile/>} />
          <Route path='users' element={<Users/>} />
          <Route path='friends' element={<Friends/>} />
          <Route path='requests' element={<Requests/>} />
          <Route path='chat' element={<UserChat/>} />
        </Route>
      </Routes>
      </ChakraProvider>
  );
}

export default App;
