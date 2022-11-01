import React from 'react';
import './App.module.scss';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterAffectedPage from './pages/RegisterAffectedPage/RegisterAffectedPage';
import RegisterMentorPage from './pages/RegisterMentorPage/RegisterMentorPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="register">
        <Route path="affected" element={<RegisterAffectedPage />} />
        <Route path="mentor" element={<RegisterMentorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
