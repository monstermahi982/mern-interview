import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import AIContentModal from "../component/ContentModal";

const Dashboard = () => {
  
  const navigate = useNavigate();

  const [content, setContent] = useState<any>([]);

  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({})

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to get content type icon
  const getContentIcon = (type: string) => {
    const icons = {
      "Blog Post": "📝",
      "Instagram Caption": "📸",
      Email: "✉️",
      "Product Description": "🛍️",
    };
    return icons[type] || "📄";
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      completed: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
      pending: "bg-blue-100 text-blue-800 border-blue-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Filter content based on selected filter
  const filteredContent = content.filter((item: any) => {
    if (filter === "all") return true;
    return item.type.toLowerCase().replace(" ", "") === filter;
  });

  const getContentData = async () => {
    const res = await apiClient.get("/content");
    if (res?.data?.length > 0) {
      setContent(res?.data || []);
      console.log(res);
    }
  };

  useEffect(() => {
    getContentData();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Manage and track your AI-generated content
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Content History
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  key: "all",
                  label: "All Content",
                  count: content.length,
                },
                {
                  key: "blog",
                  label: "Blog Posts",
                  count: content.filter(
                    (item: any) => item.type === "blog"
                  ).length,
                },
                {
                  key: "instagram-caption",
                  label: "Instagram",
                  count: content.filter(
                    (item: any) => item.type === "instagram-caption"
                  ).length,
                },
                {
                  key: "email",
                  label: "Emails",
                  count: content.filter((item: any) => item.type === "email")
                    .length,
                },
                {
                  key: "productdescription",
                  label: "Products",
                  count: content.filter(
                    (item: any) => item.type === "product-description"
                  ).length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition duration-200 flex items-center space-x-2 ${
                    filter === tab.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      filter === tab.key ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content List */}
          <div className="divide-y divide-gray-200">
            {filteredContent.length > 0 ? (
              filteredContent.map((content) => (
                <div
                  key={content.id}
                  className="p-6 hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-2xl">
                        {getContentIcon(content.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-md text-gray-600">{content.topic}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center capitalize">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                              />
                            </svg>
                            {content.type}
                          </span>
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {formatDate(content.createdAt)}
                          </span>
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {content.data?.length} words
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize">
                            {content.tone}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {content.language}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button onClick={() => { setModalData(content); setIsModalOpen(true) }} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition duration-200">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No content found
                </h3>
                <p className="text-gray-600 mb-6">
                  No content matches your current filter. Try selecting a
                  different category.
                </p>
                <button
                  onClick={() => setFilter("all")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  Show All Content
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AIContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </Layout>
  );
};

export default Dashboard;
