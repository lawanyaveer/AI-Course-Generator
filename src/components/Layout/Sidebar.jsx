import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  HomeIcon, 
  BookOpenIcon, 
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import logo from "../../assets/programming-hub.svg";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard", 
      icon: HomeIcon,
      path: "/"
    },
    {
      key: "course",
      label: "Courses",
      icon: BookOpenIcon,
      path: "/course"
    }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/" && (location.pathname === "/" || location.pathname === "/dashboard")) {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col relative flex-shrink-0`}>
      {/* Logo Section */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-4 border-b border-gray-100 flex-shrink-0`}>
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Programming Hub" className="w-5 h-5 brightness-0 invert" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ProgrammingHub
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <img src={logo} alt="Programming Hub" className="w-5 h-5 brightness-0 invert" />
          </div>
        )}
      </div>

      {/* Quick Action - Create Course */}
      {!collapsed && (
        <div className="p-4">
          <button
            onClick={() => navigate('/course/create')}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create Course</span>
          </button>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <div key={item.key} className="relative group">
              <button
                onClick={() => handleMenuClick(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative ${
                  active
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {active && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 p-3 flex-shrink-0">
        {/* User Profile */}
        <div className={`flex items-center space-x-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group relative ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <UserCircleIcon className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Premium</p>
            </div>
          )}
          
          {/* Enhanced tooltip for collapsed state */}
          {collapsed && (
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
              <p className="font-medium">John Doe</p>
              <p className="text-gray-300">Premium</p>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </div>

        {/* Settings and Logout - Updated for both collapsed and expanded states */}
        <div className="mt-2 space-y-1">
          <button className="w-full flex items-center space-x-3 px-2.5 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 group text-sm relative">
            <Cog6ToothIcon className="w-4 h-4" />
            {!collapsed && <span className="font-medium">Settings</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                Settings
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </button>
          <button className="w-full flex items-center space-x-3 px-2.5 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-sm relative group">
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            {!collapsed && <span className="font-medium">Logout</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                Logout
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
