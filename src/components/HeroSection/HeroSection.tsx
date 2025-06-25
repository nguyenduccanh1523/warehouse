import React from 'react';
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <div className="herosection-container">
      <div className="hero-content">
        <h1 className="hero-title">Save your data<br />storage here.</h1>
        <p className="hero-desc">
          Data Warehouse is a data storage area that has been tested for security, so you can store your data here safely but not be afraid of being stolen by others.
        </p>
        <button className="hero-btn">Learn more</button>
      </div>
      <div className="hero-image">
        <img src="https://warehouse-blue.vercel.app/static/media/hero-img.d06ff33bd5f804baba29.png" alt="Hero" />
      </div>
    </div>
  );
};

export default HeroSection;
