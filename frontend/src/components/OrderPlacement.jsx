import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dropzone from 'react-dropzone';
import { Typography, Container, Grid, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EventIcon from '@mui/icons-material/Event';
import { subDays } from 'date-fns';
import FNav from './FNav';

const OrderPlacement = () => {
  const { managerid } = useParams();
 
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  const [formData, setFormData] = useState({
    cropQuantity: '',
    selectedStartDate: new Date(),
    storageDays: '',
    userRequirements: '',
    selectedEndDate: new Date(),
    images: [],
  });

  const handleDateChange = (date, field) => {
    const newDate = new Date(date);
    setFormData(prevState => ({
      ...prevState,
      [field]: newDate,
    }));

    if (field === 'selectedStartDate' && formData.storageDays) {
      const endDate = new Date(newDate);
      endDate.setDate(newDate.getDate() + parseInt(formData.storageDays));
      setFormData(prevState => ({
        ...prevState,
        selectedEndDate: endDate,
      }));
    } else if (field === 'selectedEndDate' && formData.storageDays) {
      const startDate = new Date(newDate);
      startDate.setDate(newDate.getDate() - parseInt(formData.storageDays));
      setFormData(prevState => ({
        ...prevState,
        selectedStartDate: startDate,
      }));
    }
    if (field === 'selectedStartDate' && formData.selectedEndDate) {
      const storageDays = Math.floor(
        (formData.selectedEndDate - newDate) / (1000 * 60 * 60 * 24)
      );
      setFormData({
        ...formData,
        storageDays: storageDays.toString(),
      });
    } else if (field === 'selectedEndDate' && formData.selectedStartDate) {
      const storageDays = Math.floor(
        (newDate - formData.selectedStartDate) / (1000 * 60 * 60 * 24)
      );
      setFormData({
        ...formData,
        storageDays: storageDays.toString(),
      });
    }
    setCalendarOpen(false);
    setEndCalendarOpen(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === 'selectedStartDate' || name === 'selectedEndDate') {
      const startDate = new Date(formData.selectedStartDate);
      const endDate = new Date(formData.selectedEndDate);
      const storageDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
      setFormData(prevState => ({
        ...prevState,
        storageDays: storageDays.toString(),
        [name]: value,
      }));
    } else if (name === 'storageDays') {
      const startDate = new Date(formData.selectedStartDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + parseInt(value));
      setFormData(prevState => ({
        ...prevState,
        selectedEndDate: endDate,
        [name]: value,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include the selected cold storage ID and user ID in the order placement data
      const orderData = {
        ...formData,
        farmerId: userData._id,
       
        managerid: managerid, 
      };
      const token = localStorage.getItem('token'); // Get JWT token from local storage
      const headers = {
        Authorization: token ? `Bearer ${token}` : '', // Include JWT token in Authorization header
      };
      const response = await axios.post('http://192.168.243.1:3000/order', orderData, { headers });
     
      console.log('Order placed successfully:', response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error, e.g., show an error message to the user
    }
  };
  const handleImageDrop = acceptedFiles => {
    setFormData({
      ...formData,
      images: acceptedFiles.map(file => URL.createObjectURL(file)),
    });
  };



  return (
    <div> <FNav />
    <Container>
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      
    <Typography variant="h4" component="div" fontWeight="fontWeightBold" gutterBottom>
      Place Your Order  {managerid}
    </Typography>
  
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="ManagerId"
    name="managerid"  
    variant="outlined"
    value={managerid}
    disabled  
  />
</Grid> 
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Crop Quantity"
              name="cropQuantity"
              variant="outlined"
              value={formData.cropQuantity}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Select Start Date"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <EventIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCalendarOpen(true)}
                  />
                ),
              }}
              value={formData.selectedStartDate.toISOString().split('T')[0]}
              readOnly
            />
           {calendarOpen && (
  <DatePicker
    selected={formData.selectedStartDate}
    onChange={(date) => handleDateChange(date, 'selectedStartDate')}
    dateFormat="yyyy-MM-dd"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    inline
    minDate={new Date()} // Minimum allowed date is today
  />
)}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Storage Days"
              name="storageDays"
              variant="outlined"
              value={formData.storageDays}
              onChange={handleInputChange}
              required
            />
          </Grid>
        
          <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Select End Date"
    variant="outlined"
    InputProps={{
      endAdornment: (
        <EventIcon
          style={{ cursor: 'pointer' }}
          onClick={() => setEndCalendarOpen(true)}
        />
      ),
    }}
    value={formData.selectedEndDate.toISOString().split('T')[0]}
    readOnly
  />
 {endCalendarOpen && (
  <DatePicker
    selected={formData.selectedEndDate}
    onChange={(date) => handleDateChange(date, 'selectedEndDate')}
    dateFormat="yyyy-MM-dd"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    inline
    minDate={formData.selectedStartDate ? subDays(new Date(), 1) : new Date()} // Minimum allowed date is the day before selected start date or today if start date is not selected
  />
)}
</Grid>
<Grid item xs={12} >
            <TextField
              fullWidth
              label="User Requirements"
              name="userRequirements"
              variant="outlined"
              
              multiline
              rows={4}
              value={formData.userRequirements}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Dropzone onDrop={(acceptedFiles) => handleImageDrop(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                  <input {...getInputProps()} />
                  <CloudUploadIcon style={{ fontSize: 48, marginBottom: '10px' }} />
                  <p>Drag & drop some files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
            {formData.images.map((image, index) => (
              <img key={index} src={image} alt={`uploaded-${index}`} style={{ width: '100px', height: '100px', margin: '10px' }} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Place Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </Container>
    </div>
  );
};

export default OrderPlacement;