import React from 'react';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './TestimonialSection.scss';
import { motion } from 'framer-motion';




const TestimonialSection = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <div className="testimonial-section">
                    <h2 className="testimonial-title">Testimonials</h2>
                    <TestimonialCard />
                </div>
            </motion.div>
        </>
    );
};

export default TestimonialSection;
