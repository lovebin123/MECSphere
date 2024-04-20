import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Layout';
import Placements from './Pages/Placements';
import Alumniconnect from './Pages/Alumniconnect';
import Users from './Pages/Users';
import QA from './Pages/QA';
import Profile from './Pages/Profile';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './Pages/LoginForm';
import Signup from './Pages/Signup';
import Friends from './Pages/Friends'
import Requests from './Pages/Requests'


function App() {
  return (
      <ChakraProvider>
        <Routes>
        <Route path="login" element={<LoginForm/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="/dash/*" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="placements" element={<Placements/>} />
          <Route path="alumniconnect" element={<Alumniconnect/>} />
          <Route path="qa" element={<QA/>} />
          
          <Route path='profile' element={<Profile/>} />
          <Route path='users' element={<Users/>} />
          <Route path='friends' element={<Friends/>} />
          <Route path='requests' element={<Requests/>} />
        </Route>
      </Routes>
      </ChakraProvider>
  );
}

export default App;
