import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material'; // Import Material-UI components
import FNav from './FNav';

const FarmerOrders = () => {
  const [order, setOrders] = useState([]);
  //const [fullName, setfullName] = useState('');
  const [_id, setuser_id] = useState('');
  //const [email, setEmail] = useState('');

 /*  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userName = user.fullName;
      setfullName(userName);
      setEmail(user.email);
      setuser_id(user._id);
    }
  }, []); */

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id;

      fetch(`http://192.168.243.1:3000/farmerorders?farmerId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);

  return (
    <div>
      <FNav />
      <h1>Your Orders</h1>
      <Grid container spacing={2}>
        {order.map((orderItem) => (
          <Grid item key={orderItem._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Manager ID: {orderItem.managerid}</Typography>
                <Typography>Crop Quantity: {orderItem.cropQuantity}</Typography>
                <Typography>Selected Start Date: {orderItem.selectedStartDate}</Typography>
                <Typography>Storage Days: {orderItem.storageDays}</Typography>
                <Typography>Your Requirements: {orderItem.userRequirements}</Typography>
                <Typography>Selected End Date: {orderItem.selectedEndDate}</Typography>
                <Typography>Status: {orderItem.status}</Typography>
                <Typography>Images: {orderItem.images}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FarmerOrders;
