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
import OnboardingSeeker from './pages/OnboardingPages/OnboardingSeeker/OnboardingSeeker';
import OnboardingPate from './pages/OnboardingPages/OnboardingPate/OnboardingPate';
import OnboardingSHG from './pages/OnboardingPages/OnboardingSHG/OnboardingSHG';

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
          <Route path="onboardingseeker" element={<OnboardingSeeker />} />
          <Route path="onboardingpate" element={<OnboardingPate />} />
          <Route path="onboardingshg" element={<OnboardingSHG />} />
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
