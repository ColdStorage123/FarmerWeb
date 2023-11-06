import React, { useState } from 'react';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSendCode = async () => {
    try {
      console.log("Email:", email);
      console.log("Verification Code:", verificationCode);
      // Send a request to your backend to send a verification code to the user's email
      // You should implement this endpoint on your backend server
      const response = await fetch('http://192.168.243.1:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Verification Code Sent\nCheck your email for the verification code.');
      } else {
        alert('Error\nFailed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error\nAn error occurred. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        alert('Error\nNew Password and Confirm Password do not match.');
        return;
      }

      const response = await fetch('http://192.168.243.1:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      });

      if (response.ok) {
        alert('Password Reset Successful\nYour password has been reset successfully.');
        // Optionally, navigate the user to the login screen
      } else {
        alert('Error\nFailed to reset password. Please check your information and try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error\nAn error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={styles.button} onClick={handleSendCode}>Send Verification Code</button>
      <br></br>
      <input
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Confirm New Password"
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
  input: {
    marginBottom: '12px',
    padding: '10px',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '300px', // Adjust the maximum width
  },
  button: {
    backgroundColor: 'ForestGreen',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px', // Adjust the maximum width
  },
};

export default Forgot;