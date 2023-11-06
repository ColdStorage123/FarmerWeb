import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const images = ['image.jpg', 'crops.jpg', 'cold.jpeg'];

const ImageSlider = () => {
  const imageStyle = {
    maxHeight: '500px', // Set the maximum height for the images
    width: '100%', // Ensure the width adjusts proportionally
  };

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img style={imageStyle} src={image} alt={`Imge ${index + 1}`} />
          <Card
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <CardContent>
              <Typography variant="body1" component="div">
                {index === 0 ? (
                   <div style={heroSectionStyles.container}>
      

                   <div style={heroSectionStyles.text}>
                     <h2 style={heroSectionStyles.heading}><b>Empowering Farmers Preserving Harvests</b></h2>
                     <h2 style={heroSectionStyles.heading}>Connect with local ColdStorages to preserve Crops</h2>
                     <p style={heroSectionStyles.paragraph}>Join Now!!</p>
                     <Link to="/register" style={heroSectionStyles.button}>Register</Link>
                     <Link to="/login" style={heroSectionStyles.button}>Login</Link>
                   </div>
                   <style>{mediaQueries}</style>
                 </div>
                ) : index === 1 ? (
                  <div>
                    <h1>This is Message 2</h1>
                    <p>This is the second message.</p>
                  </div>
                ) : (
                  <div>
                    <h1>This is Message 3</h1>
                    <p>This is the third message.</p>
                  </div>
                )}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </Carousel>
  );
};
const heroSectionStyles = {
  container: {
  /*   position: "relative",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
   // background: "url('./image.jpg') no-repeat center center",
    backgroundSize: "cover",
    height: 'auto', */
    
  },
  text: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
    height: 'auto',
    color: 'Black'
  },
  heading: {
    fontSize: "2.5rem",
  },
  paragraph: {
    fontSize: "1rem",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#00e676",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    margin: "10px",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

// Media Queries
const mediaQueries = `
  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }
    .text {
      padding: 10px;
    }
    .heading {
      font-size: 2rem;
    }
    .paragraph {
      font-size: 0.8rem;
    }
    .button {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 10px;
    }
    .text {
      padding: 5px;
    }
    .heading {
      font-size: 1.5rem;
    }
    .paragraph {
      font-size: 0.7rem;
    }
    .button {
      font-size: 0.7rem;
    }
  }
`;

export default ImageSlider;
