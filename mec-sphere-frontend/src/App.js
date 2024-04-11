import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Layout';
import Placements from './Pages/Placements';
import Alumniconnect from './Pages/Alumniconnect';
import QA from './Pages/QA';
import Profile from './Pages/Profile';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
      <ChakraProvider>
        <Routes>
        <Route path="/dash/*" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="placements" element={<Placements/>} />
          <Route path="alumniconnect" element={<Alumniconnect/>} />
          <Route path="qa" element={<QA/>} />
          <Route path='profile' element={<Profile/>} />
        </Route>
      </Routes>
      </ChakraProvider>
  );
}

export default App;
