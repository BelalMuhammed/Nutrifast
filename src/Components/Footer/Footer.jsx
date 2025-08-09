import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#F5F5F5] text-[#5E964F] px-4 md:px-20 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm">Privacy Policy</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm">Terms of Service</p>
          <div className="flex space-x-4 text-xl">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
          <p className="text-sm text-center">
            @2024 NutriFast. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <p className="text-sm">FQA</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
