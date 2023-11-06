/* import React, { useState, useEffect } from 'react';


const Profile = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      //const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
        setNewName(parsedData.fullName);
        setNewPhoneNumber(parsedData.phoneNumber);
      } else {
        // Handle the case where user data is not available in AsyncStorage
        console.warn('User data not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handleNameEdit = () => {
    setIsNameEditable(true);
  };

  const handlePhoneNumberEdit = () => {
    setIsPhoneNumberEditable(true);
  };

  const handleSave = async () => {
    // Simulate updating user data
    try {
      await fetch('/updateUserData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: newName,
          phoneNumber: newPhoneNumber,
        }),
      });
      alert('Profile updated successfully.');
      setIsNameEditable(false);
      setIsPhoneNumberEditable(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Profile Update</h1>
      <div className="formContainer">
        <label className="label">Name</label>
        <input
          type="text"
          className="input"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          readOnly={!isNameEditable}
        />
        {isNameEditable ? (
          <button className="editButton" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="editButton" onClick={handleNameEdit}>
            Edit
          </button>
        )}

        <label className="label">Email</label>
        <div className="input">{user.email}</div>

        <label className="label">Phone Number</label>
        <input
          type="text"
          className="input"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
          readOnly={!isPhoneNumberEditable}
        />
        {isPhoneNumberEditable ? (
          <button className="editButton" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="editButton" onClick={handlePhoneNumberEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
 */
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/getUserData', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setNewName(userData.fullName);
        setNewPhoneNumber(userData.phoneNumber);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleNameEdit = () => {
    setIsNameEditable(true);
  };

  const handlePhoneNumberEdit = () => {
    setIsPhoneNumberEditable(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/updateUserData', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: newName,
          phoneNumber: newPhoneNumber,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        setIsNameEditable(false);
        setIsPhoneNumberEditable(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Profile Update</h1>
      <div className="formContainer">
        <label className="label">Name</label>
        <input
          className="input"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={!isNameEditable}
        />
        {isNameEditable ? (
          <button className="editButton" onClick={handleSave}>Save</button>
        ) : (
          <button className="editButton" onClick={handleNameEdit}>Edit</button>
        )}

        <label className="label">Email</label>
        <input className="input" type="email" value={user.email} disabled />

        <label className="label">Phone Number</label>
        <input
          className="input"
          type="text"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
          disabled={!isPhoneNumberEditable}
        />
        {isPhoneNumberEditable ? (
          <button className="editButton" onClick={handleSave}>Save</button>
        ) : (
          <button className="editButton" onClick={handlePhoneNumberEdit}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
