import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [id, setUserId] = useState(''); // Assume you get the logged-in user id from somewhere

  useEffect(() => {
    // Fetch orders for the current user when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.243.1:3000/order/:userId`, {
          data: { userId: id }, // Pass the logged-in user id in the request body
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [id]);

  return (
    <div className="App">
      <h1>My Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <strong>Order ID:</strong> {order._id}<br />
            <strong>Farmer ID:</strong> {order.farmerId}<br />
            <strong>Crop Quantity:</strong> {order.cropQuantity}<br />
            {/* Display other order details as needed */}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
