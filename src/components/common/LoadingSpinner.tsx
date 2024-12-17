import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8f00ff]"></div>
  </div>
);