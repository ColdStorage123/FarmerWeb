import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Verification from './components/Verification';
import Login from './components/Login';
import ForgotPassword from './components/Forgot';
import Storage from './components/ColdStorage';
import ALogin from './components/admin';
import StorageAction from './components/AdminDashboard';
import FarmerHome from './components/farmerhome';
import OrderPlacement from './components/OrderPlacement';
import Home from './components/Home';

import FHome from './components/farmerhome';
import OrderStatus from './components/OrderStatus';
import Dash from './components/Dash';
import Profile from './components/Profile';
import StorageAction1 from './components/PendingCSR'
import AcceptedCSR from './components/AcceptedCSR';
import PendingOrders from './components/PendingOrdersList';
import ColdStorageInfo from './components/CSI';
import StoragePage from './components/StoragePage';
import UserIdsComponent from './components/UserIdsComponent';
import ColdStorageDetails from './components/ColdStorageDetails';
import Orders from './components/Fetch'
import OrderDetails from './components/OFetch';
import OrdersComponent from './components/OrderComponent';
import Orderss from './components/Orders';

import AcceptedOrders from './components/AcceptedOrders';
import RejectedOrders from './components/RejectedOrders';
import FarmerOrders from './components/FarmerOrders';
import AcceptedCSR1 from './components/OrderPlacementHome';
import ManagerDashboard from './components/ManagerDashboard/AllManager';
import FarmerDashboard from './components/FarmerDashboard/AllFarmer';
import AdminDashboard from  './components/AdminDashboard/Admin';
import AcceptedCSR2 from './components/AcceptedStoragesAdmin';
import AboutUs from './components/AboutUs';




export default function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        
 
        <Route exact path='/register' element={< Register />}></Route>
        <Route exact path='/verification' element={< Verification />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/forgot' element={< ForgotPassword />}></Route>
        <Route exact path='/storage' element={< Storage />}></Route>
        <Route exact path='/admin' element={< ALogin />}></Route>
        <Route exact path='/dashboard' element={< StorageAction />}></Route>
      
        <Route exact path='/stor' element={< StoragePage />}></Route>
      
       
        <Route exact path='/o' element={< FarmerHome />}></Route>
        <Route exact path='/csi' element={< ColdStorageInfo />}></Route>
        <Route exact path='/user' element={< UserIdsComponent />}></Route>
        <Route exact path='/storage/:id' element={< ColdStorageInfo />}></Route>
      
        <Route path='/' element={< Home />}></Route>
        <Route path='/orde' element={< Orderss />}></Route>
        <Route path='/detail' element={< OrderDetails/>}></Route>
        <Route path='/ord' element={< OrdersComponent/>}></Route>
        <Route path='/orderfetch' element={< ManagerDashboard/>}></Route>
        <Route path='/accepted' element={< AcceptedOrders/>}></Route>
        <Route path='/rejected' element={< RejectedOrders/>}></Route>
      
        <Route path='/orderplacement' element={< AcceptedCSR1/>}></Route>


        

       
        <Route exact path='/order' element={< OrderPlacement />}></Route>
        <Route exact path='/detail' element={< ColdStorageDetails />}></Route>
        <Route exact path='/order/:managerid' element={< OrderPlacement />}></Route>
        <Route exact path='/farmer-home' element={< FHome />}></Route>
        <Route exact path='/morders' element={<Orders  />}></Route>
     
       
        <Route exact path='/manage-order-requests' element={< OrderStatus />}></Route>
       
        <Route exact path='/dash' element={< Dash />}></Route> 
        <Route exact path='/profile' element={< Profile />}></Route>
        <Route exact path='/pending-storage-request' element={< StorageAction1 />}></Route>
        <Route exact path='/accepted-storages' element={< AcceptedCSR />}></Route>
        <Route exact path='/pending-orders' element={< PendingOrders />}></Route>
        <Route exact path='manager-home' element={< ManagerDashboard />}></Route>
      
       




        <Route path='/accepted' element={< AcceptedOrders/>}></Route>
        <Route path='/rejected' element={< RejectedOrders/>}></Route>
        <Route path='/farmerorders' element={< FarmerOrders/>}></Route>
        <Route path='/farmerhome' element={< FarmerDashboard/>}></Route>
        <Route path='/ord' element={< OrdersComponent/>}></Route>
        <Route path='/admindashboard' element={< AdminDashboard/>}></Route>
        <Route path='/acceptedstoragesadmin' element={< AcceptedCSR2/>}></Route>
        <Route exact path='/about' element={<AboutUs  />}></Route>
















       
 

 

                

</Routes>
</BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

