import React, { useCallback, useEffect } from 'react';
import './App.module.scss';
import {
  Routes, Route, useNavigate, useLocation, Navigate,
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
import Preferences from './components/Container/Settings/Preferences/Preferences';
import Languages from './components/Container/Settings/Languages/Languages';

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

  const userHome = '/dashboard/search';

  // Authentication
  useEffect(() => {
    let path = location.pathname;

    // Remove variables from path
    if (path.startsWith('/dashboard/chatroom')) {
      path = '/dashboard/chatroom';
    }
    if (path.startsWith('/dashboard/search/user')) {
      path = '/dashboard/search/user';
    }

    switch (path) {
      case '/splashscreen':
      case '/': {
        if (isSignedIn()) {
          setTimeout(() => navigate(userHome), 1000);
          return;
        }
        break;
      }
      case '/landingpage': {
        if (!isSignedIn()) {
          navigate('/login');
          return;
        }
        if (!isBaseDataVerified()) {
          navigate('/register/user');
          return;
        }
        break;
      }
      case '/login': {
        if (isSignedIn()) {
          navigate(userHome);
          return;
        }
        break;
      }
      case '/onboardingseeker':
      case '/onboardingpate':
      case '/onboardingshg': {
        if (isSignedIn()) {
          navigate(userHome);
          return;
        }
        break;
      }
      case '/register': {
        if (isSignedIn()) {
          navigate(userHome);
          return;
        }
        break;
      }
      case '/register/user': {
        if (!isSignedIn()) {
          navigate('/login');
          return;
        }
        if (isSignedIn() && isBaseDataVerified()) {
          navigate(userHome);
          return;
        }
        break;
      }
      case '/register/preferences': {
        if (!isSignedIn()) {
          navigate('/login');
          return;
        }
        if (!isBaseDataVerified()) {
          navigate('/register/user');
          return;
        }
        if (isSignedIn() && hasPreferencesSet()) {
          navigate(userHome);
          return;
        }
        break;
      }
      case '/register/pate': {
        if (!isSignedIn()) {
          navigate('/login');
          return;
        }
        if (!isBaseDataVerified()) {
          navigate('/register/user');
          return;
        }
        if (isSignedIn() && isPate()) {
          navigate(userHome);
          return;
        }
        break;
      }
      case '/dashboard':
      case '/dashboard/chatroom':
      case '/dashboard/search':
      case '/dashboard/search/user':
      case '/dashboard/messages':
      case '/dashboard/groups':
      case '/dashboard/settings':
      case '/dashboard/settings/profile':
      case '/dashboard/category': {
        if (!isSignedIn()) {
          navigate('/login');
          return;
        }
        if (!isBaseDataVerified()) {
          navigate('/register/user');
          return;
        }
        if (!hasPreferencesSet() && !isPate()) {
          navigate('/landingpage');
          return;
        }
        break;
      }
      default:
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
          <Route path="user" element={<RegisterUserPage redirectOnSuccess="/landingpage" />} />
          <Route path="preferences" element={<RegisterPreferencesPage redirectOnSuccess={userHome} />} />
          <Route path="pate" element={<RegisterPatePage redirectOnSuccess={userHome} />} />
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
                <Route path="settings/edit" element={<Preferences userData={userData}/>} />
                <Route path="settings/languages" element={<Languages userData={userData}/>} />
              <Route path="category" element={<Category userData={userData} />} />
              <Route path="category/:id" element={<Category userData={userData} />} />
            </Route>
        </Route>
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </>
  );
};

export default App;
