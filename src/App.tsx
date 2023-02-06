import React, { useCallback, useEffect } from 'react';
import './App.module.scss';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterUserPage from './pages/RegisterUserPage/RegisterUserPage';
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
import RegisterPreferencesPage from "./pages/RegisterPreferencesPage/RegisterPreferencesPage";
import Category from './components/Container/Search/Category/Category';
import RegisterPatePage from "./pages/RegisterPatePage/RegisterPatePage";
import SplashScreenPage from './pages/OnboardingPages/SplashScreen/SplashScreenPage';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useZustand((state) => state.user);
  const isBaseDataVerified = useCallback(
    () => userData !== null && userData?.isBaseDataVerified,
    [userData],
  );

  const isSignedIn = useCallback(() => userData !== null, [userData]);

  const hasPreferencesSet = useCallback(
    () => userData !== null && userData?.isMeetingPreferencesVerified,
    [userData]);

  const isPate = useCallback(
    () => userData !== null && userData?.baseUserData?.processBEM === 'DONE',
    [userData]);

  // Authentication
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/dashboard') && !isSignedIn()) {
      console.log('redirecting to login');
      navigate('/login');
      return;
    }

    if (path === '/register/pate' && isPate()) {
      navigate('/dashboard/search');
      return;
    }

    if ((path.startsWith('/register') || path.startsWith('/login'))
      && isSignedIn()
      && isBaseDataVerified()
      && hasPreferencesSet()) {
      navigate('/dashboard/search');
      return;
    }

    if (isSignedIn() && !isBaseDataVerified() && path !== '/register/user') {
      navigate('/register/user');
      return;
    }

    if (isSignedIn()
      && isBaseDataVerified()
      && hasPreferencesSet()
      && path === '/register/preferences') {
      navigate('/dashboard/search');
      return;
    }

    if ((path === '/register/user' || path === '/register/preferences') && !isSignedIn()) {
      navigate('/login');
    }
  }, [hasPreferencesSet, isBaseDataVerified, isPate, isSignedIn, location, navigate, userData]);

  return (
    <>
      <Routes>
        <Route index element={<SplashScreenPage />} />
        <Route path="landingpage" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="splashscreen" element={<SplashScreenPage />} />
        <Route path="onboardingseeker" element={<OnboardingSeeker />} />
        <Route path="onboardingpate" element={<OnboardingPate />} />
        <Route path="onboardingshg" element={<OnboardingSHG />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register">
          <Route path="user" element={<RegisterUserPage redirectOnSuccess="/" />} />
          <Route path="preferences" element={<RegisterPreferencesPage redirectOnSuccess="/" />} />
          <Route path="pate" element={<RegisterPatePage redirectOnSuccess="/" />} />
        </Route>
        <Route element={<DashboardPage />}>
            <Route path="dashboard">
              <Route path="chatroom/:id" element={<ChatRoom />} />
              <Route path="search" element={<Search userData={userData} />} />
              <Route path="search/user/:id" element={userData?.baseUserData?.role === 'normal_user' ? <PateProfile userData={userData} /> : userData?.baseUserData?.role === 'pate' ? <BetroffenerProfile userData={userData}  /> : ("<Bug>: Role error")}  />
              <Route path="messages" element={<Messages />} />
              <Route path="groups" element={<Groups />} />
              <Route path="settings" element={<Settings userData={userData} />} />
              <Route path="settings/profile" element={<Profile userData={userData} />} />
              <Route path="category" element={<Category userData={userData} />} />
            </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
