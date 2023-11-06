const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../Middlewares/authMiddleware');
const mongoose = require('mongoose');
require('dotenv').config();
const User = mongoose.model('User');
const Admin = require('../models/admin');
//const authenticateToken = require('../Middlewares/authMiddlewaree');
//const authMiddleware= require('../Middlewares/authMiddleware'); 
const OrderPlacement = require('../models/OrderPlacement');
//const StorageStatus = require('../models/StorageStatus');
const StorageStatus = require('../models/storageStatus');
const auth = require('../Middlewares/authMiddlewareM');
// Fixed admin credentials (for demonstration purposes)
//
const ColdStorage=mongoose.model('ColdStorage');

///nodemailer
 const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  requireTLS: true,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'fypcomsats123@gmail.com',
    pass: 'xbngznhntmcngxqj'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function mailer(receiveremail,code) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Kashatkar 👻', // sender address
    to: `${receiveremail}`, // list of receivers
    subject: "Email registration", // Subject line
    text: `your verification code is : ${code} `, // plain text body
    html: `<b>your verification code is : ${code} </b>` , // html body
  });

  console.log("Message sent: %s", info.messageId);
  

  
} 

///nodemailer
router.post('/verify', (req, res) => {
  console.log("sent by client ", req.body);
   const { fullName, email, password, confirmPassword, phoneNumber, role } = req.body;

  if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !role) {
    return res.status(422).json({ error: "Please fill all fields" });
    //got error in postman : specify content type application/json 
  }
  User.findOne({ email: email })
    .then(async (existingUser) => {
    if (existingUser) {
      return res.status(422).json({ error: "User already exists with this email" });
      }
      try {
        
        let VerificationCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  let user = [
          {
            fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role,
      VerificationCode,
          }
        ]
  await mailer(email,VerificationCode);
        res.send({ message: "Verification Code Send to Your Email", userData: user });
        
      }
      catch (err) {
        console.log(err);
      }
  })
    

  
});




















/* router.post('/signup', async (req, res) => {
  console.log('sent by client', req.body);
  const { fullName, email, password, confirmPassword, phoneNumber, role } = req.body;

  if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !role) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists with this email" });
    }

    const user = new User({
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role, // Add the role property here
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ message: 'User Registered successfully', token });
  } catch (error) {
    console.error("db err", error);
    return res.status(500).json({ error: "Failed to signup. Please try again later" });
  }
})
  */
router.post('/signup', async (req, res) => {
  console.log('sent by client', req.body);
  const { fullName, email, password, confirmPassword, phoneNumber, role, secretCode } = req.body;

  // Check if the provided secret code is correct
  const adminSecretCode = 'your_admin_secret_code'; // Replace this with your actual secret code

  if (role === 'Admin' && secretCode !== adminSecretCode) {
    return res.status(403).json({ error: "Invalid secret code. Cannot register as admin." });
  }
/*  if (role === 'Admin') {
    user.role = 'Admin';
  }  */
  if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !role) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists with this email" });
    }

    const user = new User({
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role,
      secretCode,
    });

    await user.save();

  /*   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); */
    res.send({ message: 'User Registered successfully', token });
  } catch (error) {
    console.error("db err", error);
    return res.status(500).json({ error: "Failed to signup. Please try again later" });
  }
});
 
 
















const cookie = require('cookie'); // Import the cookie package

/* router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Set the token as a cookie in the response
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
      sameSite: 'strict', // Protects against CSRF attacks
      maxAge: 3600, // Token expires in 1 hour, adjust as needed
      path: '/' // The cookie is available for all routes
    }));

    // Send the token and user data back to the client
    res.json({ token, userData: user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Failed to login. Please try again later" });
  }
});
 */





router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }


    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expires in 1 hour, you can adjust the expiration time as needed
    });
    console.log("Generated JWT Token:", token);
    // Send the token and user data back to the client
    res.json({ token, userData: user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Failed to login. Please try again later" });
  }
});
 



/* router.get('/manager-dashboard', authenticateToken, async (req, res) => {
  // Check the user's role from the authenticated user object
  if (req.user.role !== 'Manager') {
    return res.status(403).json({ error: 'Access denied. You are not authorized.' });
  }
  
  // Proceed with serving Manager dashboard data
  // ...
  res.json({ message: 'Welcome to the Manager dashboard!', userData: req.user });
});

 */











const authMiddlewareM =  require('../Middlewares/authMiddlewareM');

/* const verifyToken = require('../Middlewares/verifyToken'); // Import the middleware */

router.post('/storage',authMiddleware,  async (req, res) => {
  
  console.log('Data sent by client', req.body);
  const { managerid,  coldStorageName, description, capacity, location, images, phoneNumber } = req.body;
 
  // Perform validation checks if required
  if (!managerid && !coldStorageName && !description && !capacity && !location && !images && !phoneNumber) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    // Create a new cold storage instance
    const coldStorage = new ColdStorage({
      managerid,
      coldStorageName,
      description,
      capacity,
      location,
      images,
      phoneNumber,
    });

    // Save the cold storage data to the database
    await coldStorage.save();

    // You can perform additional actions or validations here if needed

    res.json({ message: "Cold storage data stored successfully", coldStorage });
  } catch (error) {
    console.error("Error saving cold storage data", error);
    return res.status(500).json({ error: "Failed to store cold storage data. Please try again later" });
  }
}); 






router.post('/storagef', async (req, res) => {
  console.log('Data sent by client', req.body);

  const {
    userId,
    coldStorageName,
    description,
    capacity,
    location,
    images,
    phoneNumber
  } = req.body;

  // Perform validation checks if required
  if (!userId || !coldStorageName || !description || !capacity || !location || !images || !phoneNumber) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    // Retrieve the current user's ID from localStorage
    const currentUserId = // When the user logs in
    localStorage.setItem(userData.id);
    
    // Compare the current user's ID with the userId from the request
    if (currentUserId !== userId) {
      return res.status(403).json({ error: "You can only create a cold storage for your own user ID." });
    }

    // Create a new cold storage instance
    const coldStorage = new ColdStorage({
      userId,
      coldStorageName,
      description,
      capacity,
      location,
      images,
      phoneNumber,
    });

    // Save the cold storage data to the database
    await coldStorage.save();

    // You can perform additional actions or validations here if needed

    res.json({ message: "Cold storage data stored successfully", coldStorage });
  } catch (error) {
    console.error("Error saving cold storage data", error);
    return res.status(500).json({ error: "Failed to store cold storage data. Please try again later" });
  }
});


router.get('/userids', async (req, res) => {
  try {
    // Fetch all user IDs from the ColdStorage collection
    const userIds = await ColdStorage.distinct('userId');
    res.json({ userIds });
  } catch (error) {
    console.error("Error fetching user IDs", error);
    res.status(500).json({ error: "Failed to fetch user IDs. Please try again later" });
  }
});





router.get('/storage/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the cold storage data based on the user ID
    const coldStorage = await ColdStorage.findOne({ userId });
    if (!coldStorage) {
      return res.status(404).json({ error: 'Cold storage not found for the provided user ID' });
    }
 // Send the cold storage name and status to the frontend
    res.json({ coldStorageName: coldStorage.coldStorageName, status: coldStorage.status });
  } catch (error) {
    console.error('Error fetching cold storage data', error);
    return res.status(500).json({ error: 'Failed to fetch cold storage data. Please try again later' });
  }
}); 
/* router.get('/orderrs', async (req, res) => {
  const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
  try {
    const orders = await OrderPlacement.find({ managerid: userId }); // Fetch the orders from the database
    res.json(orders); // Send the fetched orders to the React frontend as a JSON object
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
}); */
/* router.post('/storage', async (req, res) => {
  const { userId, coldStorageName, description, capacity, location, images, phoneNumber } = req.body;

  // Perform validation checks if required

  try {
    const coldStorage = new ColdStorage({
      userId,
      coldStorageName,
      description,
      capacity,
      location,
      images,
      phoneNumber,
    });

    // Save the cold storage data to the database
    await coldStorage.save();

    res.json({ message: 'Cold storage data stored successfully', coldStorage });
  } catch (error) {
    console.error('Error saving cold storage data', error);
    return res.status(500).json({ error: 'Failed to store cold storage data. Please try again later' });
  }
});
 */
// Fetch cold storage data based on userId
/* router.get('/storage', async (req, res) => {
  const { userId } = req.query;

  try {
    const coldStorage = await ColdStorage.findOne({ userId });

    if (!coldStorage) {
      return res.status(404).json({ error: 'Cold storage data not found' });
    }

    // Send the cold storage name and status to the frontend
    res.json({ coldStorageName: coldStorage.coldStorageName, status: coldStorage.status });
  } catch (error) {
    console.error('Error fetching cold storage data', error);
    return res.status(500).json({ error: 'Failed to fetch cold storage data. Please try again later' });
  }
}); */




router.get('/storage/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch storage details based on userId from the database
    const storageDetails = await ColdStorage.findOne({ userId });

    if (!storageDetails) {
      return res.status(404).json({ error: 'Storage details not found for the given user ID' });
    }

    res.json(storageDetails);
  } catch (error) {
    console.error('Error fetching storage details', error);
    return res.status(500).json({ error: 'Failed to fetch storage details. Please try again later' });
  }
});















/* router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: 'Please provide an email address' });
  }

  try {
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found with this email address' });
    }

    // Generate a verification code
    const verificationCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    // Send the verification code to the user's email using Nodemailer
    await mailer(email, verificationCode);

    // Store the verification code in the user document (you should have a field for this in your User schema)
    user.resetPasswordCode = verificationCode;
    await user.save();

    res.json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the verification code' });
  }
});


















router.post('/reset-password', async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  if (!email || !verificationCode || !newPassword) {
    return res.status(422).json({ error: 'Please provide all required information' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found with this email address' });
    }

    // Check if the provided verification code matches the stored code
    if (user.resetPasswordCode !== verificationCode) {
      return res.status(422).json({ error: 'Incorrect verification code' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the verification code
    user.password = hashedPassword;
    user.resetPasswordCode = null;
    await user.save();

    // Generate a new token with the updated credentials
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

    // Send the new token and a success message back to the client
    res.json({ token, message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while resetting the password' });
  }
});

 */















router.post('/admin', async (req, res) => {
  const { email, password } = req.body;
  const fixedAdminEmail = 'admin@example.com';
  const fixedAdminPassword = 'adminpassword';
  if (email === fixedAdminEmail && password === fixedAdminPassword) {
    // Authentication successful
    const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' }); // You should use a strong, secret key here
    
    res.status(200).json({
      message: 'Authentication successful',
      token,
    });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
  if (res.status === 200) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
  
    navigate('/pending-storage-request');
  } 
  console.log('Incoming Email:', email);
    console.log('Incoming Password:', password);
});




 
 
//Cold Storages with status Pending 
router.get('/storager',authMiddleware, async (req, res) => {
  const { status } = req.query;
  try {
    let coldStorageRequests;
    if (status === 'pending') {
      coldStorageRequests = await ColdStorage.find({ status: 'pending' });
    } else {
      coldStorageRequests = await ColdStorage.find();
    }
  
  
   res.json(coldStorageRequests); 
  } catch (error) {
    console.error('Error fetching cold storage requests:', error);
    return res.status(500).json({ error: 'Failed to fetch cold storage requests' });
  }
});








router.get('/getorders', async (req, res) => {
  try {
    const order = await OrderPlacement.find(); // Assuming you're using the OrderPlacement model
    res.json(order);
  } catch (error) {
    console.error("Error fetching Storages:", error);
    return res.status(500).json({ error: `Failed to fetch Storages. Error: ${error.message}` });
  }
});


// Apply the middleware to restrict access to farmer panel
/* router.use('/farmer-home', authenticateToken);

// Define farmer routes
router.get('/farmer-home', (req, res) => {
  // Handle farmer home route logic
}); 
 */
// Apply the middleware to restrict access to manager panel
/* router.use('/manager-home', authenticateToken); */

// Define manager routes
router.get('/manager-home', (req, res) => {
  // Handle manager home route logic
});


/* router.post('/order', async (req, res) => {
  console.log('Data sent by client', req.body);
  const { userId, cropQuantity, selectedStartDate, storageDays, userRequirements, images, selectedEndDate } = req.body;

  // Perform validation checks if required
  if (userId ||!cropQuantity || !selectedStartDate|| !storageDays || !userRequirements || !images || !selectedEndDate) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  //const { cropQuantity, selectedStartDate, storageDays, userRequirements, images, selectedEndDate } = req.body;

  try {
    const orderPlacement = new OrderPlacement({
      userId,
      cropQuantity,
      selectedStartDate: new Date(selectedStartDate), // Convert to Date object
      storageDays,
      userRequirements,
      selectedEndDate: new Date(selectedEndDate), // Convert to Date object
      images,
    });

    await orderPlacement.save();

    res.json({ message: "Your order is successfully added in waiting list for approval", orderPlacement });

  } catch (error) {
    console.error("Error saving order placement data:", error);
    return res.status(500).json({ error: `Failed to place your order. Error: ${error.message}` });
  }
});
 */
router.post('/order',authMiddleware, async (req, res) => {
  console.log('Data sent by client', req.body);
  const { farmerId, managerid,  cropQuantity, selectedStartDate, storageDays, userRequirements, images, selectedEndDate } = req.body;

  // Perform validation checks if required
  if (!farmerId ||!managerid  || !cropQuantity || !selectedStartDate || !storageDays || !userRequirements || !images || !selectedEndDate) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    const orderPlacement = new OrderPlacement({
      farmerId, // Assign farmerId to userId field in the schema
      managerid: managerid, 
      cropQuantity,
      selectedStartDate: new Date(selectedStartDate), // Convert to Date object
      storageDays,
      userRequirements,
      selectedEndDate: new Date(selectedEndDate), // Convert to Date object
      images,
    });

    await orderPlacement.save();

    res.json({ message: "Your order is successfully added in the waiting list for approval", orderPlacement });

  } catch (error) {
    console.error("Error saving order placement data:", error);
    return res.status(500).json({ error: `Failed to place your order. Error: ${error.message}` });
  }
});

router.get('/orders/:managerId', async (req, res) => {
  try {
    const managerId = req.params.managerId;
    // Find orders where managerid matches the provided managerId
    const orders = await OrderPlacement.find({ managerid: managerId });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});
router.get('/ordered', async (req, res) => {
  const managerid = req.query.managerid;

  try {
    // Fetch orders from the database where managerid matches the provided managerid
    const orders = await OrderPlacement.find({ managerid: managerid });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});
router.get('/farmerorders', async (req, res) => {
  const farmerId = req.query.farmerId;

  try {
    // Fetch orders from the database where managerid matches the provided managerid
    const orders = await OrderPlacement.find({ farmerId: farmerId });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to fetch orders. Error: ${error.message}' });
  }
});


/* / Define a new route for fetching order details based on userId
router.get('/orders/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the order where managerid matches the logged-in userId
    const order = await OrderPlacement.findOne({ managerid: userId });

    if (order) {
      // Order found, send the order details in the response
      res.json(order);
    } else {
      // Order not found for the given userId
      res.status(404).json({ error: 'Order not found for this user' });
    }
  } catch (error) {
    // Handle database error
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
}); */


















/* router.get('/order/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find orders where managerid matches the logged-in userId
    const orders = await OrderPlacement.find({ managerid: userId });

    if (orders.length > 0) {
      // Orders found, send the order details in the response
      res.json(orders);
    } else {
      // No orders found for the given userId
      res.status(404).json({ error: 'No orders found for this user' });
    }
  } catch (error) {
    // Handle database error
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
}); */
/* router.get('/order', async (req, res) => {
  const userId = req.query.id; // Assuming the user ID is sent as a query parameter

  try {
    // Fetch orders where managerid matches the user ID
    const orders = await OrderPlacement.find({ managerid: userId });

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});
 */

router.get('/managername', async (req, res) => {
  try {
    const managerName = req.user.fullName; // Assuming the user object contains the manager's name
    res.json({ managerName });
  } catch (error) {
    console.error("Error fetching manager's name:", error);
    return res.status(500).json({ error: "Failed to fetch manager's name" });
  }
});









router.post('/accept', async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const storageRequest = await StorageStatus.findByIdAndUpdate(id, {
      status: 'Accepted',
      comments: comments,
    }, { new: true }); // Add { new: true } to return the updated document

    if (!storageRequest) {
      return res.status(404).json({ error: 'Storage request not found' });
    }

    res.json(storageRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const storageRequest = await StorageStatus.findByIdAndUpdate(id, {
      status: 'Rejected',
      comments: comments,
    }, { new: true }); // Add { new: true } to return the updated document

    if (!storageRequest) {
      return res.status(404).json({ error: 'Storage request not found' });
    }

    res.json(storageRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






router.post('/reset-password', async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  if (!email || !verificationCode || !newPassword) {
    return res.status(422).json({ error: 'Please provide all required information' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found with this email address' });
    }

    // Check if the provided verification code matches the stored code
    if (user.resetPasswordCode !== verificationCode) {
      console.log('Verification Code Mismatch');
      return res.status(422).json({ error: 'Incorrect verification code' });
    }

    // Store the new password (unhashed)
    user.password = newPassword;
    user.confirmPassword = newPassword;
    user.resetPasswordCode = null;

    // Hash the new password before saving it
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password with the hashed password
    user.password = hashedPassword;

    // Save the updated user data
    await user.save();

    // Generate a new token for the user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    console.log('User Password Updated:', user.password);

    // Send the new token in the response
    res.json({ message: 'Password reset successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while resetting the password' });
  }
});

















router.put('/storager/:id/accept', authMiddleware, async (req, res) => {
  try {
    const storageRequest = await ColdStorage.findById(req.params.id);
    if (!storageRequest) {
      return res.status(404).json({ error: 'Storage request not found' });
    }

    // Update status to 'accepted'
    storageRequest.status = 'accepted';
    await storageRequest.save();

    res.json({ message: 'Storage request accepted successfully' });
  } catch (error) {
    console.error('Error accepting storage request:', error);
    return res.status(500).json({ error: 'Failed to accept storage request' });
  }
});

router.put('/storager/:id/reject', authMiddleware, async (req, res) => {
  try {
    const storageRequest = await ColdStorage.findById(req.params.id);
    if (!storageRequest) {
      return res.status(404).json({ error: 'Storage request not found' });
    }

    // Update status to 'rejected'
    storageRequest.status = 'rejected';
    await storageRequest.save();

    res.json({ message: 'Storage request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting storage request:', error);
    return res.status(500).json({ error: 'Failed to reject storage request' });
  }
});
 // Add a new route to fetch orders for the logged-in manager
router.get('/ordersf/:managerid', async (req, res) => {
  const { managerid } = req.query;

  try {
    const orders = await OrderPlacement.find({ managerid: managerid });
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});


router.get('/ordersfetch', async (req, res) => {
  try {
    const { managerid } = req.query;
    // Assuming OrderPlacement model has a 'managerid' field to filter orders
    const orders = await OrderPlacement.find({ managerid: mongoose.Types.ObjectId(managerid) });

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});






router.get('/accepted-storages', async (req, res) => {
  try {
    const acceptedStorages = await ColdStorage.find({ status: 'accepted' });
    res.json(acceptedStorages);
  } catch (error) {
    console.error('Error fetching accepted cold storages:', error);
    return res.status(500).json({ error: 'Failed to fetch accepted cold storages' });
  }
});





router.get('/cold-storages', async (req, res) => {
  try {
    // Fetch all cold storage details from the database
    const coldStorages = await ColdStorage.find();
    
    // You can customize the data you want to send to the client
    const formattedColdStorages = coldStorages.map((coldStorage) => ({
      _id: coldStorage._id,
      coldStorageName: coldStorage.coldStorageName,
      description: coldStorage.description,
      capacity: coldStorage.capacity,
      location: coldStorage.location,
      images: coldStorage.images, 
      // Add more fields as needed
    }));

    res.json(formattedColdStorages);
  } catch (error) {
    console.error('Error fetching cold storage data:', error);
    res.status(500).json({ error: 'Failed to fetch cold storage data. Please try again later.' });
  }
});









router.get('/orders', async (req, res) => {
  const { status } = req.query;
  try {
    let orderRequests;
    if (status === 'pending') {
      orderRequests = await OrderPlacement.find({ status: 'pending' });
    } else {
      orderRequests = await OrderPlacement.find();
    }
    res.json(orderRequests);
  } catch (error) {
    console.error('Error fetching cold storage requests:', error);
    return res.status(500).json({ error: 'Failed to fetch cold storage requests' });
  }
});
router.put('/orders/:id/accept', async (req, res) => {
  try {
    const orderRequest = await OrderPlacement.findById(req.params.id);
    if (!orderRequest) {
      return res.status(404).json({ error: 'Storage request not found' });
    }

    // Update status to 'accepted'
    orderRequest.status = 'accepted';
    await orderRequest.save();

    res.json({ message: 'Storage request accepted successfully' });
  } catch (error) {
    console.error('Error accepting storage request:', error);
    return res.status(500).json({ error: 'Failed to accept storage request' });
  }
});

router.put('/orders/:id/reject', async (req, res) => {
  try {
    const orderRequest = await OrderPlacement.findById(req.params.id);
    if (!orderRequest) {
      return res.status(404).json({ error: 'Storage request not found' });
    }

    // Update status to 'rejected'
    orderRequest.status = 'rejected';
    await orderRequest.save();

    res.json({ message: 'Storage request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting storage request:', error);
    return res.status(500).json({ error: 'Failed to reject storage request' });
  }
});
router.get('/getUserData', authMiddleware, async (req, res) => {
  // Now, req.user should contain user data, including _id
  try {
    // Fetch user data from the database based on the user ID
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data. Please try again later.' });
  }
});


router.put('/updateUserData',authMiddleware, async (req, res) => {
  try {
    // Get the user ID from the request, assuming you're using JWT for authentication
    const userId = req.user._id; // Assuming you have middleware to verify JWT and add user data to the request object

    // Fetch user data from the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data with the new values
    user.fullName = req.body.fullName;
    user.phoneNumber = req.body.phoneNumber;

    // Save the updated user data to the database
    await user.save();

    res.json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data. Please try again later.' });
  }
});






router.post('/order/:managerid', async (req, res) => {
  console.log('Data sent by client', req.body);
  const { cropQuantity, selectedStartDate, storageDays, userRequirements, images, selectedEndDate } = req.body;
  const { managerid } = req.params; // Extract Cold Storage ID from request params

  // Perform validation checks if required
  // ... (your validation logic)

  try {
    // Check if the selected cold storage exists and is accepted
    const coldStorage = await ColdStorage.findOne({ managerid: managerid, status: 'accepted' });
    if (!coldStorage) {
      return res.status(404).json({ error: "Selected cold storage not found or not accepted" });
    }

    const orderPlacement = new OrderPlacement({
      cropQuantity,
      selectedStartDate: new Date(selectedStartDate),
      storageDays,
      userRequirements,
      selectedEndDate: new Date(selectedEndDate),
      images,
      managerid: managerid, // Associate the order with the selected cold storage
    });

    /*await orderPlacement.save(); */

    res.json({ message: "Your order is successfully added to the waiting list for approval", orderPlacement });

  } catch (error) {
    console.error("Error saving order placement data:", error);
    return res.status(500).json({ error: `Failed to place your order. Error: ${error.message}` });
  }
});













// Assuming you are using Express.js
router.get('/fetchOrderDetails', async (req, res) => {
  const loggedInUserId = req.query.managerid; // Get the managerid from the query parameter
  try {
    // Query the database to find orders that match the managerid and logged in user ID
    const orderDetails = await OrderPlacement.findOne({ managerid: loggedInUserId, farmerId: loggedInUserId });
    
    if (!orderDetails) {
      return res.status(404).json({ error: "No matching order found." });
    }

    res.json({ orderPlacement: orderDetails });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ error: `Failed to fetch order details. Error: ${error.message}` });
  }
});

















router.put('/updateOrderStatus/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    // Find the order by orderId and update its status
    const updatedOrder = await OrderPlacement.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: `Failed to update order status. Error: ${error.message}` });
  }
});

module.exports = router;



