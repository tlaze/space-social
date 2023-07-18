import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserContext from './contexts/UserContext';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import { ArticlePage } from './pages/ArticlePage';

function App() {

  return (
    <BrowserRouter>
      <UserContext>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:articleid" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
