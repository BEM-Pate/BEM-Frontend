import React, { ReactElement, useCallback } from 'react';
import './App.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterSeekerPage from './pages/RegisterSeekerPage/RegisterSeekerPage';
import RegisterPatePage from './pages/RegisterPatePage/RegisterPatePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Search from './components/Container/Search/Search';
import Groups from './components/Container/Groups/Groups';
import Profile from './components/Container/Profile/Profile';
import Messages from './components/Container/Messages/Messages';
import LoginPage from './pages/LoginPage/LoginPage';
import useSessionStorage from './helpers/useSessionStorage';

const App = () => {
  const [userData, setUserData] = useSessionStorage('userData', null);

  const authenticationSwitch = useCallback(
    (
      component: ReactElement,
      redirectPath: string,
    ) => (userData ? component : <Navigate replace to={redirectPath} />),
    [userData],
  );

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage setUserData={setUserData} />} />
      <Route path="register">
        <Route path="seeker" element={<RegisterSeekerPage />} />
        <Route path="pate" element={<RegisterPatePage />} />
      </Route>
      <Route element={<DashboardPage />}>
        <Route path="dashboard">
          <Route path="search" element={<Search />} />
          <Route path="messages" element={<Messages />} />
          <Route path="groups" element={<Groups />} />
          <Route path="profile" element={authenticationSwitch(<Profile />, '/login')} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
