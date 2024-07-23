import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer absolute mt-20 bg-[#427aa1]">
            <div className="footer-container">
                <div className="footer-section">
                    <h1 className="footer-logo">Stockify</h1>
                    <p className='text-[#001d3d]'>It simplifies inventory management with real-time tracking, easy updates, and powerful insights, making stock control effortless and efficient.</p>
                </div>
                <div className="footer-section">
                    <h6 className='underline underline-offset-2 text-[#fb8500]'>Company</h6>
                    <ul className='text-[#001d3d]'>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-conditions">Terms & Condition</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h6 className='underline underline-offset-2 text-[#fb8500]'>Services</h6>
                    <ul className='text-[#001d3d]'>
                        <li>Inventory management</li>
                        <li>Sale records</li>
                        <li>Stock reports</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h6 className='underline underline-offset-2 text-[#fb8500]'>Contact</h6>
                    <p className='text-[#001d3d]'><i className="fa fa-map-marker-alt me-3"></i>Nairobi, Kenya</p>
                    <p className='text-[#001d3d] hover:text-[#17CF97]'><i className="fa fa-phone-alt me-3"></i><a href="tel:+254712345678">+2547-12-345-678</a></p>
                    <p className='text-[#001d3d] hover:text-[#17CF97]'><i className="fa fa-envelope me-3"></i><a href="mailto:mail@provider.com">Support@gmail.com</a></p>
                </div>
            </div>
        </footer>
    );
}