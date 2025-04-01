import { useEffect } from 'react'
import './App.css'
import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { useUserStore } from './stores/useUserStore'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from 'react-hot-toast'
import CredentialPage from './pages/CredentialPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'


function App() {

  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (checkingAuth) <LoadingSpinner />
  return (
    <div className='min-h-screen bg-gray-50 overflow-hidden'>
      <div className='relative z-50 pt-16'>
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Navigate to="/dashboard" /> : <HomePage />} />
          <Route path='/signup' element={user ? <Navigate to="/dashboard" /> : <SignUpPage />} />
          <Route path='/login' element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path='/dashboard' element={user ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path='/dashboard/:credentialId' element={<CredentialPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:resetToken' element={<ResetPasswordPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App
