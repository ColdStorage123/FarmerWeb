import { useState, useEffect } from 'react'
import './Farmer.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'

function FarmerDashboard() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'
    }
  }, []);
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

export default FarmerDashboard;