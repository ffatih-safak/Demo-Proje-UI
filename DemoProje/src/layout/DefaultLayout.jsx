import React from 'react';
import AppSidebar from './AppSidebar';
import AppContent from './AppContent';
import '../assets/style/sidebarContent.css'
import { useSessionLoginStatus } from '../network/useSession';
import Login from '../pages/Login';
const DefaultLayout = () => {
  const loginStatus = useSessionLoginStatus();

  return (
    <>
      {loginStatus ? (<><div className="sidebar"> <AppSidebar /> </div>  <div className="content">
        <AppContent />
      </div></>) :
        (
          <Login />
        )}

    </>
  );
}

export default DefaultLayout;
