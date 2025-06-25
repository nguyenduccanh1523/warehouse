import React from 'react';
import './Footer.scss';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
        >
            <footer className="footer-container">
                <div className="footer-main">
                    <div className="footer-col footer-brand">
                        <div className="footer-logo-row">
                            <span className="footer-logo-icon" />
                            <span className="footer-logo-text">DataWarehouse</span>
                        </div>
                        <div className="footer-address">
                            <div>Warehouse Society, 234</div>
                            <div>Bahagia Ave Street  PRBW 29281</div>
                        </div>
                        <div className="footer-contact">
                            <div>info@warehouse.project</div>
                            <div>1-232-3434 (Main)</div>
                        </div>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">About</div>
                        <ul>
                            <li>Profile</li>
                            <li>Features</li>
                            <li>Careers</li>
                            <li>DW News</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">Help</div>
                        <ul>
                            <li>Support</li>
                            <li>Sign up</li>
                            <li>Guide</li>
                            <li>Reports</li>
                            <li>Q&A</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">Social Media</div>
                        <div className="footer-socials">
                            <span className="footer-social-icon" />
                            <span className="footer-social-icon" />
                            <span className="footer-social-icon" />
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div>
                        © Datawarehouse™ 2020. All rights reserved.<br />
                        Company Registration Number: 21479524.
                    </div>
                    <div className="footer-chat-btn">
                        <span className="footer-chat-icon" />
                    </div>
                </div>
            </footer>
        </motion.div>
    );
};

export default Footer;
