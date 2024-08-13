import React, {useState, useEffect} from 'react';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Profile from './pages/Profile';
import UpdateUserInfo from './pages/UpdateUserInfo';

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        marginTop: '75px'
      },
    }),
  },
});

function App() {
  const [isCustom, setIsCustom] = useState(null);
  const changeTheme = (value) => {
    setIsCustom(value);
  }

  return (
    <ChakraProvider 
      theme={isCustom === true ? customTheme : undefined}
    >
      <Router>
        <AppContent changeTheme={changeTheme}/>
      </Router>
    </ChakraProvider>
  );
}

function AppContent({changeTheme}) {
  const location = useLocation();
  const isMarginApplied = (location.pathname !== "/login" && location.pathname !== "/signup");
  useEffect(() => {changeTheme(isMarginApplied)}, [isMarginApplied])
  
  return (
    <>
      {isMarginApplied && <Navbar />}
      <Routes>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events/:id" element={<EventDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update/:user_id" element={<UpdateUserInfo />} /> 
      </Routes>
    </>
  );
}

export default App;
