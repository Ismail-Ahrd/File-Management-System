import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import './App.css'
import HomePage from './components/homepage/HomePage';
import SideBar from './components/sidebar/SideBar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';

function App() {
  const { userLoggedIn } = useAuth();
  const { pathname } = useLocation();
  return (
    <>
      
      <Routes>
        <Route exact path="/login" element={ <Login />} />
        <Route exact path="/register" element={ <Register />} />
        <Route exact path="/" element={ <HomePage />} />
      </Routes>

      {
        userLoggedIn && pathname.startsWith("/dashboard") ?
        <div className='flex'>
          <SideBar />
          <div className='flex-1'>
            <Header />
            
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
        :
        null
      }
    </>
  )
}

export default App
