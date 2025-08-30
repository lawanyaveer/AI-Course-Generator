import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const Header = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getCurrentPage = () => {
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      return { label: "Dashboard", description: "Overview & Analytics" };
    }
    if (location.pathname === "/course/create") {
      return { label: "Create Course", description: "AI-powered course creation" };
    }
    if (location.pathname.startsWith("/course")) {
      return { label: "Courses", description: "Manage your courses" };
    }
    return { label: "Page", description: "Current page" };
  };

  const currentPage = getCurrentPage();

  return (
    <header className="bg-white border-b border-gray-200 flex-shrink-0 relative z-10">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Menu Toggle & Page Info */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-600 hover:text-gray-900"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <Bars3Icon className="w-5 h-5" />
              ) : (
                <XMarkIcon className="w-5 h-5" />
              )}
            </button>
            
            {/* Page Info */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">
                {currentPage.label}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {currentPage.description}
              </p>
            </div>
          </div>
          
          {/* Right Section - Search & Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-64 pl-9 pr-4 py-2 text-sm border rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                  searchFocused 
                    ? 'border-indigo-500 ring-2 ring-indigo-100' 
                    : 'border-gray-200 focus:border-indigo-500'
                }`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className={`h-4 w-4 transition-colors duration-200 ${
                  searchFocused ? 'text-indigo-500' : 'text-gray-400'
                }`} />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">John</p>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <UserCircleIcon className="w-4 h-4 text-gray-500" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <Cog6ToothIcon className="w-4 h-4 text-gray-500" />
                    <span>Settings</span>
                  </button>
                  
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
