import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import logo from './../../public/icon.png';

const Footer = () => {
  return (
    <footer className="bg-[#080b28] text-white mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <a href="https://workandtravelguide.org/" target="_blank" rel="noopener noreferrer" className="flex items-center mb-4 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Work & Travel Guide" className="h-10 w-auto mr-1" />
              <div className='flex flex-col justify-center items-center'>
                <span className="text-xl font-semibold barlow-condensed">WORK AND </span>
                <span className="text-xl font-semibold barlow-condensed">TRAVEL GUIDE</span>
              </div>
            </a>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for finding work opportunities and travel guide across Australia. 
              Connecting international workers with employers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Find Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Travel Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Visa Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Accommodation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <a href="mailto:admin@workandtravelguide.com" className="text-gray-300 hover:text-white transition-colors">
                  admin@workandtravelguide.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <a href="tel:+491234567890" className="text-gray-300 hover:text-white transition-colors">
                  +49 1 23456 7890
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div className="text-gray-300">
                  <p>Skyline Plaza, Europa-Allee 6</p>
                  <p>60327 Frankfurt am Main, Germany</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Work & Travel Guide. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
