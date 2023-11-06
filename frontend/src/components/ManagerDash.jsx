import { useState } from 'react'
import './Dash.css'
import Header from './ManagerHeader'
import Sidebar from './ManagerSidebar'
import Home from './ManagerHomeDash'

function ManagerDash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default ManagerDash; 


/*import React, { useState, useEffect } from 'react';
import './Dash.css';
import Header from './ManagerHeader';
import Sidebar from './ManagerSidebar';
import Home from './ManagerHomeDash';

function ManagerDash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [userData, setUserData] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://http://192.168.243.1:3000/manager-dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming the server responds with user data including the role
          setUserData(data.userData);
        } else {
          // Handle unauthorized access
          console.error('Access denied. You are not authorized.');
          // Redirect the user to the login page or handle the situation accordingly
        }
      } catch (error) {
        // Handle network errors or other issues
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  if (!userData) {
    // Handle loading state while waiting for the response
    return <div>Loading...</div>;
  }

  // Render Manager dashboard content using userData
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
   //   <Home userData={userData} /> {/* Pass user data to the Home component 
   // </div>
  //);
//}

//export default ManagerDash;  */