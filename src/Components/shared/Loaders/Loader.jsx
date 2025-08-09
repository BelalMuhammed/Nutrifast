import React from "react";

const LoaderSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);
export default LoaderSpinner;
