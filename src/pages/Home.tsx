import React from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import Footer from '../components/Footer/Footer';
import FeatureCard from '../components/FeatureCard/FeatureCard';
import TestimonialSection from '../components/TestimonialSection/TestimonialSection';
import './Home.scss';
import { motion } from 'framer-motion';

const Home = () => {


    return (
        <div className="home-page">
            <Header />
            <div style={{ marginTop: '3rem' }}>
                <HeroSection />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <h2 className="features-title">Features</h2>
                <p className="features-desc">Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.</p>
                <div className="features-list">
                    <FeatureCard />
                </div>
            </motion.div>
            <TestimonialSection />
            <Footer />
        </div>
    );
};

export default Home;