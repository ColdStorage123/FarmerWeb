import React from "react";
import Navbar from "./Navbar"; // Import your Navbar component
import HeroSection from "./UnderNav"; // Import the HeroSection component
import DownloadAppSection from "./MobileApp"
import Footer from "./Footer"
import PSLanding from "./PSLanding"
import Benefits from "./Benefits";
/* import HeroSectionn from "./HeroSection"; */
import FAQ from "./FAQs";
import ImageSlider from "./ImageSlider";
import FeaturesSection from "./FeaturesSection";
import ProblemSolutionSection from "./ProblemSolutionSection";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Navbar />
      <ImageSlider />
      <ProblemSolutionSection />
   {/*  <PSLanding /> */ }
      <FeaturesSection />
   {/*    <Benefits /> */ }
      <WhyChooseUs />
    
      <FAQ />
      <DownloadAppSection/>
      <Footer />
   
     {/*  < HeroSectionn /> */}
     {/*      <HeroSection /> */ }
     
      
      {/* Other components or content */}
    </div>
  );
};

export default Home;