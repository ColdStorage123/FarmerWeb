import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const FeaturesSection = () => {
  const cardStyle = {
    width: '250px',
    height: '300px',
    margin: '10px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  };

  const iconStyle = {
    fontSize: '50px',
    marginBottom: '10px',
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Features</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card style={{ ...cardStyle, backgroundColor: '#E8F5E9' }}>
          <CardContent>
            <LocationOnIcon style={{ ...iconStyle, color: '#4CAF50' }} />
            <Typography variant="h6">Select Nearest Cold Storage</Typography>
            <Typography variant="body2">
              Find and book cold storage facilities nearest to your location effortlessly.
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ ...cardStyle, backgroundColor: '#E1F5FE' }}>
          <CardContent>
            <TrackChangesIcon style={{ ...iconStyle, color: '#2196F3' }} />
            <Typography variant="h6">Track Orders</Typography>
            <Typography variant="body2">
              Monitor your storage orders in real-time and stay updated on your stored items.
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ ...cardStyle, backgroundColor: '#FFFDE7' }}>
          <CardContent>
            <StarIcon style={{ ...iconStyle, color: '#FFC107' }} />
            <Typography variant="h6">Rating</Typography>
            <Typography variant="body2">
              Rate and review your storage experience to help others make informed decisions.
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ ...cardStyle, backgroundColor: '#FFCCBC' }}>
          <CardContent>
            <MonetizationOnIcon style={{ ...iconStyle, color: '#FF5722' }} />
            <Typography variant="h6">Revenue Increase for Cold Storages</Typography>
            <Typography variant="body2">
              Boost your cold storage business revenue by connecting with more farmers.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeaturesSection;
