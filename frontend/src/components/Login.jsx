import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogin = async () => {
    // Implement user authentication logic here
    
    try {
      const response = await fetch('http://192.168.204.1:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      //console.log('Error fetching user data:', token);

      if (!response.ok) {
        throw new Error('Failed to login. Please check your credentials.');
      }

      const data = await response.json();

     /*  if (data.error === 'Invalid credentials') {
        setShowError(data.error);
      } else {
        
        localStorage.setItem('userData', JSON.stringify(data.userData));
        console.log('userData',data.userData); */
        if (data.error === 'Invalid credentials') {
          setShowError(data.error);
        } else {
          localStorage.setItem('token', data.token); // Save the JWT token to localStorage
          localStorage.setItem('userData', JSON.stringify(data.userData));
          console.log('userData',data.userData);
   
        if (data.userData.role === 'Manager') {
          localStorage.setItem('token', data.token);
          navigate('/manager-home'); // Navigate to the Manager home page
        } else if (data.userData.role === 'Farmer') {
          localStorage.setItem('token', data.token);
          navigate('/farmerhome'); // Navigate to the Farmer home page
        } else if (data.userData.role === 'Admin') {
          localStorage.setItem('token', data.token);
          navigate('/admindashboard'); // Navigate to the Farmer home page
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error', 'Failed to login. Please try again later.');
    }
  };
  
    useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get('message');
    if (message) {
      setShowError(message);
    }
  }, [location.search]);
  /*useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get('message');
    if (message) {
      setShowError(message);
    }
  }, [location.search]); */

  const styles = {
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
        backgroundColor: 'silver'
    },
    rightSection: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    
      padding: '3%',
    },
    card: {
        maxWidth: '400px',
    padding: '30px',
    border: '1px solid #ccc',
   
    backgroundColor: 'white',
    borderRadius: '20px'
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
    heading: {
      marginTop: '30px',
      fontWeight: 'bold',
    
      fontSize: '30px',
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
    },
    para: {
      marginTop: '30px',
      fontSize: '30px',
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
    },

    
  };

  return (
    <div style={styles.container}>
      <Navbar />
      {/* <div style={styles.leftSection}>
        {/* Content for the left section (if any) */}
       <div ><b><h2 style={styles.heading}> Welcome Back</h2></b>
       <p style={styles.para}>Glad To see You Again</p>
       <p style={styles.para}>Thankyou For Choosing Our Service</p></div>
      <div style={styles.rightSection}>
       
        <div style={styles.card}>
          <h1 style={styles.header}>Login</h1>
          <label style={styles.label}>Email</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showError && (
            <span style={styles.errorText}>Invalid credentials</span>
          )}
          <button
            style={styles.button}
            onClick={handleLogin}
          >
            Login
          </button>
          <br></br>
          <Link to= "/forgot">Forgot Password</Link>
        </div>
      </div>
      <Footer />
          </div>
  );
};

export default Login;