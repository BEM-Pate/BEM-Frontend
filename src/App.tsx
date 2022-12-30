import React, { ReactElement, useCallback } from 'react';
import './App.module.scss';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterSeekerPage from './pages/RegisterSeekerPage/RegisterSeekerPage';
import RegisterPatePage from './pages/RegisterPatePage/RegisterPatePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Search from './components/Container/Search/Search';
import Groups from './components/Container/Groups/Groups';
import Profile from './components/Container/Profile/Profile';
import Messages from './components/Container/Messages/Messages';
import TopNavigationBar from './components/TopNavigationBar/TopNavigationBar';
import LoginPage from './pages/LoginPage/LoginPage';
import useSessionStorage from './helpers/useSessionStorage';
import EditProfile from './components/Container/Profile/EditProfile/EditProfile';
import SplashScreen from './pages/Onboarding/SplashScreenPages/SplashScreenPage1/SplashScreenPage';
import SplashScreen2 from './pages/Onboarding/SplashScreenPages/SplashScreenPage2/SplashScreenPage2';
import OnboardingPage1 from './pages/Onboarding/Onboarding1Page/OnboardingPage1';
import OnboardingPage2 from './pages/Onboarding/Onboarding2Page/OnboardingPage2';
import OnboardingPage3 from './pages/Onboarding/Onboarding3Page/OnboardingPage3';

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
    <div>
      <BrowserRouter>
        <TopNavigationBar />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage setUserData={setUserData} />} />
          <Route path="splashscreen" element={<SplashScreen />} />
          <Route path="splashscreen2" element={<SplashScreen2 />} />
          <Route path="onboardingseeker" element={<OnboardingPage1 />} />
          <Route path="onboardingpate" element={<OnboardingPage2 />} />
          <Route path="onboardinggroup" element={<OnboardingPage3 />} />
          <Route path="login" element={<LoginPage setUserData={setUserData} />} />
          <Route path="register">
            <Route path="seeker" element={<RegisterSeekerPage />} />
            <Route path="pate" element={<RegisterPatePage />} />
          </Route>
          <Route element={<DashboardPage />}>
            <Route path="dashboard">
              <Route path="search" element={<Search userData={userData} />} />
              <Route path="messages" element={<Messages />} />
              <Route path="groups" element={<Groups />} />
              <Route path="profile" element={authenticationSwitch(<Profile />, '/login')} />
              <Route path="editprofile" element={<EditProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
