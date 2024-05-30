import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import './App.css'
import HomePage from './components/homepage/HomePage';
import SideBar from './components/sidebar/SideBar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import CreatedFileComponent from './components/createdFileComponent/CreatedFileComponent';
import Profile from './components/profile/Profile';
import { useState } from 'react';

function App() {
  const { userLoggedIn } = useAuth();
  const { pathname } = useLocation();
  const [filter, setFilter] = useState("all")
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
          <SideBar setFilter={setFilter} filter={filter} />
          <div className='flex-1 ml-60'>
            <main className='mt-20'>
              <Routes>
                <Route exact path="/dashboard/profile" element={<Profile />} />
                <Route exact path="/dashboard/file/:documentId" element={<CreatedFileComponent />} />
                <Route exact path="/dashboard/:documentId" element={<Dashboard filter={filter}/>} />
              </Routes>
            </main>
          </div>
        </div>
        :
        null
      }
    </>
  )
}

export default App
