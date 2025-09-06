import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14H8V5z"
          />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      id: "templates",
      label: "Templates",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      path: "/",
      badge: "New",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      path: "/",
    },
  ];

  const bottomMenuItems = [
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      path: "/settings",
    },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);


  useEffect(() => {
    const userStr = localStorage.getItem("user");
    setUser(JSON.parse(userStr));
  }, [])

  return (
    <div
      className={`bg-white w-full shadow-xl border-r border-gray-200 transition-all duration-300 flex flex-col h-screen`}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IA</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Content Gen AI
                </h2>
                <p className="text-xs text-gray-500">AI Content Generator</p>
              </div>
            </div>
          )}

          {/* <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
              />
            </svg>
          </button> */}
        </div>
      </div>

      {/* New Content Button */}
      <div className="p-4">
        <button onClick={() => navigate('/create')} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center shadow-lg hover:shadow-xl">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {!isCollapsed && "New Content"}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {setActiveItem(item.id); navigate(item.path)}}
            className={`w-full flex items-center px-3 py-3 rounded-xl text-left transition duration-200 group ${
              activeItem === item.id
                ? "bg-blue-50 text-blue-700 shadow-md border border-blue-100"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div
              className={`flex items-center justify-center w-5 h-5 ${
                activeItem === item.id
                  ? "text-blue-600"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              {item.icon}
            </div>

            {!isCollapsed && (
              <>
                <span className="ml-3 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Language Selector */}
      <div className="px-4 pb-4">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="w-full flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
            {!isCollapsed && (
              <>
                <span className="ml-3 font-medium">
                  {
                    languages.find((lang) => lang.code === selectedLanguage)
                      ?.flag
                  }{" "}
                  {
                    languages.find((lang) => lang.code === selectedLanguage)
                      ?.name
                  }
                </span>
                <svg
                  className="ml-auto w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>

          {/* Language Dropdown */}
          {showLanguageDropdown && !isCollapsed && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition duration-200 ${
                    selectedLanguage === lang.code
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700"
                  }`}
                >
                  <span className="mr-3">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {selectedLanguage === lang.code && (
                    <svg
                      className="ml-auto w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="px-4 pb-4 border-t border-gray-200 pt-4">
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`w-full flex items-center px-3 py-3 rounded-xl text-left transition duration-200 mb-1 group ${
              activeItem === item.id
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div
              className={`flex items-center justify-center w-5 h-5 ${
                activeItem === item.id
                  ? "text-blue-600"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              {item.icon}
            </div>
            {!isCollapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* User Profile (if not collapsed) */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || "John"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email || "john@gmail.com"}</p>
            </div>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
