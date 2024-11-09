import React from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-gray-600 text-sm">
              © {currentYear} Ayush Khandelwal. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/Ayush-Khandelwal28"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SiGithub className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ayushkhandelwal28/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SiLinkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;