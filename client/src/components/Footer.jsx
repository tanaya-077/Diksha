import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-4'>
            <div className='flex flex-col lg:flex-row items-center gap-4'>
                <p>© All Rights Reserved 2025.</p>
                <Link to="/about-us" className='hover:text-primary-100'>About Us</Link>
            </div>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='' className='hover:text-primary-100'>
                    <FaFacebook/>
                </a>
                <a href='' className='hover:text-primary-100'>
                    <FaInstagram/>
                </a>
                <a href='' className='hover:text-primary-100'>
                    <FaLinkedin/>
                </a>
                <a href='https://wa.me/c/919820096952' className='hover:text-primary-100'>
                    <FaWhatsapp />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
