import React, { useEffect, useState } from 'react';
import MNav from './MNav';
import { Card, CardContent, Typography, Grid } from '@mui/material'; 
import { Fade } from "@mui/material";

const AcceptedOrders = () => {
  const [order, setOrders] = useState([]);
  const [fullName, setfullName] = useState('');
  const [_id, setuser_id] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userName = user.fullName;
      setfullName(userName);
      setEmail(user.email);
      setuser_id(user._id);
      const userId = user._id;
    }
  }, []);
 
  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id;
  
      fetch(`http://192.168.243.1:3000/ordered?managerid=${userId}&status=accepted`)
        .then((response) => response.json())
        .then((data) => {
          console.log('API response:', data); 
          setOrders(data); 
        })
        .catch((error) => {
          console.error('Error fetching accepted orders:', error);
        });
    }
  }, []);
  

  

 
  return (
    <div>
      <MNav />
      <h1 style={{ textDecoration: 'none', color: 'green', marginTop: '10px', textAlign: 'center' }} ><strong>Accepted Orders</strong> </h1>
      <Grid container spacing={2}>
        {order
         .filter((order) => order.status === 'Accepted')
         .map((order) => (
            <Grid item key={order._id} xs={12} sm={6} md={4}>
              <Fade in={true} timeout={500}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Farmer ID: {order.farmerId}</Typography>
                  <Typography>Crop Quantity: {order.cropQuantity}</Typography>
                  <Typography>Selected Start Date: {order.selectedStartDate}</Typography>
                  <Typography>Storage Days: {order.storageDays}</Typography>
                  <Typography>User Requirements: {order.userRequirements}</Typography>
                  <Typography>Selected End Date: {order.selectedEndDate}</Typography>
                  <Typography>Images: {order.images}</Typography>
                </CardContent>
              </Card>
              </Fade>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default AcceptedOrders;
