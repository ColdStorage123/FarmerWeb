import React, { useState } from 'react';
import { InputAdornment, Container, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { AccountCircle, Email, Phone, Lock, VpnKey } from '@mui/icons-material';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [role, setRole] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [secretCode, setSecretCode] = useState(''); 

  const handlePhoneNumberChange = (text) => {
    const trimmedText = text.trim();
    setPhonenumber(trimmedText);
    setShowError(trimmedText.length > 0 && trimmedText.length !== 11);
  };

  const validateEmail = (email) => {
    const regex = /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z \s]+$/;
    return regex.test(name);
  };

  const validatename = (Name) => {
    return Name && validateName(Name);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{11}$/;
    return regex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /.{8,}/; // Password should be at least 8 characters long
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (confirmpassword) => {
    return confirmpassword === password;
  };

  const handleRegister = async () => {
    if (!validatename(name)) {
      alert('Error: Enter a Valid first name');
    } else if (!validateEmail(email)) {
      alert('Error: Enter Valid Email');
    } else if (!validatePhoneNumber(phonenumber)) {
      alert('Error: Enter Valid Phone Number (11 digits)');
    } else if (!validatePassword(password)) {
      alert('Error: Enter Valid Password (8 characters)');
    } else if (!validateConfirmPassword(confirmpassword)) {
      alert('Error: Passwords do not match');
    } else if (role === '') {
      alert('Error: Please select a role');
    } else {
      const userData = {
        fullName: name,
        email: email,
        password: password,
        confirmPassword: confirmpassword,
        phoneNumber: phonenumber,
        role: role,
        secretCode: secretCode,
      };
      try {
        const response = await fetch('http://192.168.243.1:3000/signup', { // Use the correct endpoint '/signup'
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (role === 'Admin' && secretCode !== 'your_admin_secret_code') {
          alert('Error: Invalid secret code. Cannot register as admin.');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to register user. Please try again later.');
        }
    const data = await response.json();

       
    /*  if (data.error === 'Invalid credentials') {
          setShowError('Invalid credentials');
        } else if (data.message === 'Verification Code Send to Your Email') {
          console.log(data.userData);
          window.alert(data.message);
          navigate('/verification', { state: { userData: data.userData } });
          //navigate('/Login');
          return; } */
      
if (data.error === 'User already exists with this email') {
          alert(data.error);
        } else if (data.message === 'User Registered successfully') {
          alert(data.message);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error', 'Failed to register user. Please try again later.');
      }
    }
  };

 /*  const styles = {
    container: {
   
      justifyContent: 'center',
      //padding: '20px',
      backgroundColor: '#F2F3F4',
     // backgroundImage: `url('background.jpg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    },
    leftSection: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'silver',
    },
    rightSection: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2F3F4',
      padding: '20px',
    },
    card: {
      maxWidth: '400px',
      padding: '30px',
      border: '1px solid #ccc',
      backgroundColor: 'white',
      borderRadius: '20px',
    },
    header: {
      marginTop: '30px',
      fontWeight: 'bold',
      color: 'green',
      fontSize: '30px',
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none',
    },
    errorText: {
      color: 'red',
      marginTop: '5px',
      marginBottom: '10px',
    },
    button: {
        display: 'block',
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        marginBottom: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s ease-in-out', // Add transition for smooth color change
      },
    dropdown: {
      width: '105%',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none',
    },
    link: {
      textDecoration: 'none',
      color: 'green',
      marginTop: '10px',
    },
    buttonHover: {
        backgroundColor: 'darkgreen', // Change the background color on hover
      },
    
  }; */
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ flex: 1, backgroundColor: '#bbdefb', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="1sm">
        <Grid container spacing={2} style={{  borderRadius: '50%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {/* Left Section (Image and Text) */}
        <Grid item xs={14} md={6} style={{ backgroundColor: '#8E44AD', color: 'white', justifyContent: 'center', alignItems: 'center' }}>
          {/* Add your image here */}
          <Typography variant="h6" align="center">Our platform connects Farmers directly with Cold Storages.</Typography>
              <Typography variant="subtitle1" align="center">Join our platform to save your produce</Typography>
          <img src="ourlogo.png" alt="Platform logo" style={{ width: "100%", height: "auto" }} />
          
        </Grid>

        {/* Right Section (Registration Form) */}
        <Grid item xs={12} md={6} style={{ backgroundColor: 'white', color: 'blue'}}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center"><strong>Register Here</strong></Typography>
            </Grid>

            <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <TextField
            label="Full Name"
           variant="outlined"
            fullWidth
            value={name}
            placeholder='Enter Your Full Name '
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle /> {/* Icon for Full Name */}
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email /> {/* Icon for Email */}
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={phonenumber}
            placeholder='Enter Your Phone Number'
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone /> {/* Icon for Phone Number */}
                </InputAdornment>
              ),
            }}
            error={showError}
            helperText={showError && "Phone Number should be 11 digits"}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            placeholder='Choose Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock /> {/* Icon for Password */}
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            placeholder='Confirm Your Password'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey /> {/* Icon for Confirm Password */}
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: '16px' }}
          />
              <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
                <InputLabel id="role-label">Register As:</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="">Select an option</MenuItem>
                  <MenuItem value="Farmer">Farmer</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
                <br></br>
                {role === 'Admin' && (
        <TextField
          label="Secret Code"
          variant="outlined"
          fullWidth
          value={secretCode}
          onChange={(e) => setSecretCode(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
      )}
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                style={{ marginBottom: '16px' }}
              >
                Register
              </Button>
            </Grid>
        </Grid>
      </Grid>
      </Grid>
      
    </Container>
    </div>

      <Footer />
    </div>
   

  );
};

export default Register;