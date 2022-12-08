import React from 'react';
import './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterSeekerPage from './pages/RegisterSeekerPage/RegisterSeekerPage';
import RegisterPatePage from './pages/RegisterPatePage/RegisterPatePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Search from './components/Container/Search/Search';
import Groups from './components/Container/Groups/Groups';
import Profile from './components/Container/Profile/Profile';
import Messages from './components/Container/Messages/Messages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="register">
        <Route path="seeker" element={<RegisterSeekerPage />} />
        <Route path="pate" element={<RegisterPatePage />} />
      </Route>
      <Route element={<DashboardPage />}>
        <Route path="dashboard">
          <Route path="search" element={<Search />} />
          <Route path="messages" element={<Messages />} />
          <Route path="groups" element={<Groups />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
