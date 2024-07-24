import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Profile from './pages/Profile';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}

function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}
      <Routes>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
