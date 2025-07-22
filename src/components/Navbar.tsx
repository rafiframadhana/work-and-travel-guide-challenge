import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Tooltip } from "react-tooltip";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="https://workandtravelguide.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-38 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Nav Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 font-medium text-lg hover:underline hover:underline-offset-[6px] hover:decoration-[#ffbb00] hover:decoration-2 transition-all duration-150"
              >
                Home
              </a>
              <a
                href="#travel"
                className="text-gray-700 font-medium text-lg hover:underline hover:underline-offset-[6px] hover:decoration-[#ffbb00] hover:decoration-2 transition-all duration-150"
              >
                Travel
              </a>
              <a
                href="#jobs"
                className="text-gray-700 font-medium text-lg hover:underline hover:underline-offset-[6px] hover:decoration-[#ffbb00] hover:decoration-2 transition-all duration-150"
              >
                Jobs
              </a>
            </nav>
          </div>

          {/* Profile */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div
                data-tooltip-id="profile-tooltip"
                data-tooltip-content="Rafif Ramadhana"
                className="cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm hover:shadow-md transition-shadow">
                  RR
                </div>
              </div>
            </div>
            <Tooltip
              id="profile-tooltip"
              place="bottom"
              noArrow={false}
              style={{
                backgroundColor: "#374151",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "12px",
                padding: "6px 12px",
                zIndex: 9999,
              }}
            />
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Nav Links */}
              <a
                href="#home"
                className="block px-3 py-2 text-gray-700 font-medium text-base hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#travel"
                className="block px-3 py-2 text-gray-700 font-medium text-base hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Travel
              </a>
              <a
                href="#jobs"
                className="block px-3 py-2 text-gray-700 font-medium text-base hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jobs
              </a>

              {/* Profile Mobile */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs mr-3">
                    RR
                  </div>
                  <span className="text-gray-700 font-medium">
                    Rafif Ramadhana
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
