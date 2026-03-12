import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    Services: [
      { name: 'Buy Properties', href: '/properties' },
      { name: 'Sell Properties', href: '/add-property' },
      { name: 'Property Valuation', href: '#' },
      { name: 'Investment Advice', href: '#' },
    ],
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-gold to-accent-600 rounded-lg flex items-center justify-center">
                <BuildingOfficeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-playfair">
                LuxeEstate
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover extraordinary properties with our AI-powered luxury real estate marketplace. 
              Connect directly with sellers and find your dream home.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-400">
                Powered by AI • Premium Experience
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-gold">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {currentYear} LuxeEstate. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="text-sm text-gray-400">
                Made with ❤️ for luxury real estate
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;