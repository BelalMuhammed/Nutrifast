import React from "react";
import loader from "../../../../public/Loader.gif"
const LoaderSpinner = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <img src={loader} className="w-100" alt="Loading..." />
  </div>

);
export default LoaderSpinner;
