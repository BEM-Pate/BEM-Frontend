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
import TopNavigationBar from './components/TopNavigationBar/TopNavigationBar';
import LoginPage from './pages/LoginPage/LoginPage';
import useSessionStorage from './helpers/useSessionStorage';
import OnboardingSeeker from './pages/OnboardingPages/OnboardingSeeker/OnboardingSeeker';
import OnboardingPate from './pages/OnboardingPages/OnboardingPate/OnboardingPate';
import OnboardingSHG from './pages/OnboardingPages/OnboardingSHG/OnboardingSHG';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Button from './components/Button/Button';
import Settings from './components/Container/Settings/Settings';
import ChatRoom from './components/Container/Messages/Chatroom';
import { useZustand } from './zustand/store';

const App = () => {
  const [userData, setUserData] = useSessionStorage('userData', null);
  const navigate = useNavigate();
  const location = useLocation();
  const route = useZustand((state) => state.route);

  const isBaseDataVerified = useCallback(
    () => userData !== null && userData?.account?.isBaseDataVerified,
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
      navigate('/dashboard/profile');
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

  const logout = useCallback(() => {
    setUserData(null);
    navigate('/login');
  }, [navigate, setUserData]);

  return (
    <>
      {!route?.includes('chatroom') && <TopNavigationBar />}
      {userData && <Button onClick={logout}>Logout</Button>}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage setUserData={setUserData} />} />
        <Route path="onboardingseeker" element={<OnboardingSeeker />} />
        <Route path="onboardingpate" element={<OnboardingPate />} />
        <Route path="onboardingshg" element={<OnboardingSHG />} />
        <Route path="register" element={<RegisterPage setUserData={setUserData} />} />
        <Route path="register">
          <Route
            path="user"
            element={(
              <RegisterUserPage
                userData={userData}
                setUserData={setUserData}
              />
              )}
          />
        </Route>
        <Route element={<DashboardPage />}>
          <Route path="dashboard">
            <Route path="chatroom/:id" element={<ChatRoom />} />
            <Route path="search" element={<Search userData={userData} />} />
            <Route path="messages" element={<Messages />} />
            <Route path="groups" element={<Groups />} />
            <Route path="profile" element={<Profile userData={userData} />} />
            <Route path="settings" element={<Settings userData={userData} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
