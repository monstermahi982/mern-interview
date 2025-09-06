import React, { useState } from "react";
import apiClient from "../utils/apiClient";
import Layout from "../layout/layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Starter = () => {
  const [formData, setFormData] = useState({
    contentType: "",
    topic: "",
    keywords: "",
    tone: "",
    language: "English",
  });

  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const contentTypes = [
    {
      value: "blog",
      label: "Blog Post",
      icon: "📝",
      description: "Long-form content for websites",
    },
    {
      value: "instagram",
      label: "Instagram Caption",
      icon: "📸",
      description: "Engaging social media captions",
    },
    {
      value: "email",
      label: "Email",
      icon: "✉️",
      description: "Professional email content",
    },
    {
      value: "product",
      label: "Product Description",
      icon: "🛍️",
      description: "Compelling product descriptions",
    },
  ];

  const toneOptions = [
    {
      value: "friendly",
      label: "Friendly",
      description: "Warm and approachable",
    },
    {
      value: "professional",
      label: "Professional",
      description: "Formal and business-like",
    },
    { value: "witty", label: "Witty", description: "Clever and humorous" },
  ];

  const languageOptions = [
    { value: "English", label: "English", flag: "🇺🇸" },
    { value: "Hindi", label: "Hindi", flag: "🇮🇳" },
    { value: "Marathi", label: "Marathi", flag: "🇮🇳" },
  ];

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.contentType) {
      newErrors.contentType = "Please select a content type";
    }

    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    } else if (formData.topic.trim().length < 3) {
      newErrors.topic = "Topic must be at least 3 characters long";
    }

    if (!formData.tone) {
      newErrors.tone = "Please select a tone";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (formData.contentType === "email") {
        const res = await createEmail(formData);
        toast.success("Email is created successfully");
      } else if (formData.contentType === "product") {
        const res = await createProductDesc(formData);
        toast.success("Product Description is created successfully");
      } else if (formData.contentType === "blog") {
        const res = await createBlog(formData);
        toast.success("Blog is created successfully");
      } else if (formData.contentType === "instagram") {
        const res = await createInstagramCaption(formData);
        toast.success("Instragram Caption is create successfully");
      }

      // Reset form after successful submission
      setFormData({
        contentType: "",
        topic: "",
        keywords: "",
        tone: "",
        language: "English",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      navigate('/dasboard')
    }
  };

  const createEmail = async (payload: any) => {
    return apiClient.post("/generate-email", {
      ...payload,
      userId: "68bbe53acf959d959df97ac0",
      keywords: payload.keywords.split(","),
    });
  };

  const createBlog = async (payload: any) => {
    return apiClient.post("/blog", payload);
  };

  const createProductDesc = async (payload: any) => {
    return apiClient.post("/product-description", payload);
  };
  const createInstagramCaption = async (payload: any) => {
    return apiClient.post("/instagram-caption", payload);
  };

  return (
    <Layout>
      <div className="w-full p-6">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Let's get you started!
          </h1>
          <p className="text-lg text-gray-600">
            Create amazing content with AI assistance
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            {/* Content Type Selection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Choose content goal:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                      formData.contentType === type.value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value={type.value}
                      checked={formData.contentType === type.value}
                      onChange={(e) =>
                        handleInputChange("contentType", e.target.value)
                      }
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4 w-full">
                      <div className="text-2xl">{type.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {type.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {type.description}
                        </div>
                      </div>
                      {formData.contentType === type.value && (
                        <div className="text-blue-500">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              {errors.contentType && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.contentType}
                </p>
              )}
            </div>

            {/* Input Details Section */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Input Prompt Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Topic Input */}
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Topic Name *
                  </label>
                  <input
                    id="topic"
                    type="text"
                    placeholder="Enter topic name (e.g., Digital Marketing Tips)"
                    value={formData.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                      errors.topic
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.topic && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.topic}
                    </p>
                  )}
                </div>

                {/* Keywords Input */}
                <div>
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Keywords (Optional)
                  </label>
                  <input
                    id="keywords"
                    type="text"
                    placeholder="Enter keywords separated by commas"
                    value={formData.keywords}
                    onChange={(e) =>
                      handleInputChange("keywords", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Example: SEO, content marketing, social media
                  </p>
                </div>
              </div>
            </div>

            {/* Tone and Language Section */}
            <div className="border-t pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Pick Tone *
                  </label>
                  <div className="space-y-3">
                    {toneOptions.map((tone) => (
                      <label
                        key={tone.value}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.tone === tone.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="tone"
                          value={tone.value}
                          checked={formData.tone === tone.value}
                          onChange={(e) =>
                            handleInputChange("tone", e.target.value)
                          }
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">
                            {tone.label}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tone.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.tone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.tone}
                    </p>
                  )}
                </div>

                {/* Language Selection */}
                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700 mb-3"
                  >
                    Choose Language
                  </label>
                  <select
                    id="language"
                    value={formData.language}
                    onChange={(e) =>
                      handleInputChange("language", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.flag} {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-8">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition duration-200 flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Content...
                  </>
                ) : (
                  <>
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Generate Content
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Starter;
