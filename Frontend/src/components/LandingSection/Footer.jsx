import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Frontend Task. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-gray-500 text-sm hover:text-darkRed transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-500 text-sm hover:text-darkRed transition-colors">
              Terms of Service
            </Link>
          </div>
      </div>
    </footer>
  );
};

export default Footer;