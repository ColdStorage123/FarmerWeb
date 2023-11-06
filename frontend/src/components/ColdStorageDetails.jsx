import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ColdStorageDetails = () => {
  const [coldStorageData, setColdStorageData] = useState(null);

  useEffect(() => {
    // Retrieve the current user's ID from localStorage
    const currentUserId = localStorage.getItem('currentUserId');

    // Make a GET request to the backend API endpoint to fetch cold storage details for the current user
    axios.get(`/api/storage/${currentUserId}`)
      .then(response => {
        // Set the retrieved cold storage data to the state
        setColdStorageData(response.data.coldStorage);
      })
      .catch(error => {
        console.error('Error fetching cold storage details:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h2>Cold Storage Details</h2>
      {coldStorageData ? (
        <div>
          <p>Cold Storage Name: {coldStorageData.coldStorageName}</p>
          <p>Description: {coldStorageData.description}</p>
          <p>Capacity: {coldStorageData.capacity}</p>
          <p>Location: {coldStorageData.location}</p>
          {/* You can render other details here */}
        </div>
      ) : (
        <p>Loading cold storage details...</p>
      )}
    </div>
  );
};

export default ColdStorageDetails;
