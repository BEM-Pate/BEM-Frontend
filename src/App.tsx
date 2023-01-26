import React, { useCallback, useEffect } from 'react';
import './App.module.scss';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterUserPage from './pages/RegisterSeekerPage/RegisterUserPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Search from './components/Container/Search/Search';
import Groups from './components/Container/Groups/Groups';
import Profile from './components/Container/Profile/Profile';
import Messages from './components/Container/Messages/Messages';
import LoginPage from './pages/LoginPage/LoginPage';
import OnboardingSeeker from './pages/OnboardingPages/OnboardingSeeker/OnboardingSeeker';
import OnboardingPate from './pages/OnboardingPages/OnboardingPate/OnboardingPate';
import OnboardingSHG from './pages/OnboardingPages/OnboardingSHG/OnboardingSHG';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Settings from './components/Container/Settings/Settings';
import ChatRoom from './components/Container/Messages/Chatroom';
import PateProfile from './components/Container/Search/UserProfile/PateProfile';
import BetroffenerProfile from "./components/Container/Search/UserProfile/BetroffenerProfile";
import {useZustand} from "./zustand/store";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useZustand((state) => state.user);

  const isBaseDataVerified = useCallback(
    () => userData !== null && userData?.isBaseDataVerified,
    [userData],
  );

  const isSignedIn = useCallback(() => userData !== null, [userData]);

  // Authentication
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/dashboard') && !isSignedIn()) {
      navigate('/login');
      return;
    }

    if ((path.startsWith('/register') || path.startsWith('/login'))
      && isSignedIn()
      && isBaseDataVerified()) {
      navigate('/');
      return;
    }

    if (isSignedIn() && !isBaseDataVerified() && path !== '/register/user') {
      navigate('/register/user');
      return;
    }

    if (path === '/register/user' && !isSignedIn()) {
      navigate('/login');
    }
  }, [isBaseDataVerified, isSignedIn, location, navigate, userData]);

  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="onboardingseeker" element={<OnboardingSeeker />} />
        <Route path="onboardingpate" element={<OnboardingPate />} />
        <Route path="onboardingshg" element={<OnboardingSHG />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register">
          <Route path="user" element={<RegisterUserPage />} />
        </Route>
        <Route element={<DashboardPage />}>
            <Route path="dashboard">
              <Route path="chatroom/:id" element={<ChatRoom />} />
              <Route path="search" element={<Search userData={userData} />} />
              <Route path="search/user/:id" element={userData?.role === 'normal_user' ? <PateProfile userData={userData} /> : <BetroffenerProfile userData={userData} />} />
              <Route path="messages" element={<Messages />} />
              <Route path="groups" element={<Groups />} />
              <Route path="settings" element={<Settings userData={userData} />} />
              <Route path="settings/profile" element={<Profile userData={userData} />} />
            </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
