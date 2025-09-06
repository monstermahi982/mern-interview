import React, { useState } from 'react';

const AIContentModal = ({ isOpen, onClose, data }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data?.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Format content for better display
  const formatContent = (text) => {
    return text?.split('\n').map((line, index) => {
      // Handle subject line
      if (line.startsWith('Subject:')) {
        return (
          <div key={index} className="mb-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Email Subject</div>
            <div className="text-lg font-semibold text-gray-900 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              {line.replace('Subject: ', '')}
            </div>
          </div>
        );
      }
      
      // Handle bullet points
      if (line.trim().startsWith('•')) {
        return (
          <div key={index} className="flex items-start mb-2 ml-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-700">{line.replace('•', '').trim()}</p>
          </div>
        );
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        return <div key={index} className="mb-4"></div>;
      }
      
      // Handle signature
      if (line.includes('Sincerely') || line.includes('Best regards') || line.includes('Thanks')) {
        return (
          <p key={index} className="text-gray-700 font-medium mt-4">
            {line}
          </p>
        );
      }
      
      // Handle company name or signature line
      if (line.includes('Team') || line.includes('Company')) {
        return (
          <p key={index} className="text-gray-900 font-semibold mb-2">
            {line}
          </p>
        );
      }
      
      // Handle placeholders
      if (line.includes('[') && line.includes(']')) {
        return (
          <p key={index} className="text-gray-700 mb-3">
            {line.split(/(\[.*?\])/).map((part, partIndex) => (
              part.startsWith('[') && part.endsWith(']') ? (
                <span key={partIndex} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">
                  {part}
                </span>
              ) : (
                <span key={partIndex}>{part}</span>
              )
            ))}
          </p>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Generated Content</h2>
              <p className="text-sm text-gray-500 capitalize">{data.type} • {data.topic}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Generated Successfully
            </span>
            <span className="text-sm text-gray-500">
              {data?.data?.split(' ').length} words • {Math.ceil(data?.data?.length / 1000)} min read
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-green-600 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span className="text-sm text-gray-600">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Display */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-gray max-w-none">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              {formatContent(data.data)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
            <div></div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AIContentModal;