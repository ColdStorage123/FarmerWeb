import React, { useEffect, useState } from 'react';

const ManagerDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const managerId = localStorage.getItem('user.id');
    fetch(`http://192.168.243.1:3000/orders/${managerId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the response to inspect the data structure
        setOrders(data);
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, []);// Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h1>Manager Dashboard </h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            Order ID: {order._id}, Crop Quantity: {order.cropQuantity}, Start Date: {order.selectedStartDate}, End Date: {order.selectedEndDate}
            {/* Display other order details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerDashboard;
