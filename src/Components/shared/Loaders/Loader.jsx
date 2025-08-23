import React from "react";
import loader from "../../../../public/Loader.gif"
const LoaderSpinner = () => (
  <div className="flex justify-center items-center  h-full">
    {/* E:\ITI_front end\27 Graduation Project\NutriFast\Nutrifast\public\Loader.gif */}
    <img src={loader} alt="" />
    {/* <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div> */}
  </div>
);
export default LoaderSpinner;
