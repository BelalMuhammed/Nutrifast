import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Api/Axios";
import { Link } from "react-router-dom";

const VendorsLogo = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosInstance.get("/vendorsLogo");
        setVendors(response.data);
        setError("");
      } catch {
        setError(
          "An error occurred while loading vendor data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <span className="text-app-primary font-semibold text-lg">
          Loading vendor data...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <section
      className="w-full py-12 sm:py-16"
      style={{ background: "linear-gradient(to bottom, #000, #121712)" }}
    >
      <div className="app-container relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Our Local Vendor Partners
            <span className="block mx-auto mt-2 w-16 h-1 bg-app-accent rounded-full"></span>
          </h2>
          <p className="text-white max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-2">
            At NutriFast, we believe in the power of local products and proudly
            support Egyptian vendors. If you're a local supplier, we invite you
            to join our platform and showcase your healthy products. Let's grow
            together and make a real impact on healthy living in Egypt—become a
            valued partner in our journey!
          </p>
          < Link
            to="/register/vendor"
            className="inline-block mt-6 px-5 py-2.5 rounded-md bg-app-accent text-white text-base shadow-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Register as a Vendor
          </Link>
        </div>
        {/* Marquee Animation Container */}
        <div className="overflow-hidden w-full">
          <div
            className="flex animate-marquee whitespace-nowrap"
            style={{ animation: "marquee 30s linear infinite" }}
          >
            {[...vendors, ...vendors].map((vendor, idx) => (
              <div
                key={vendor.id + "-" + idx}
                className="flex items-center justify-center gap-3 px-2 py-2 bg-transparent cursor-pointer mx-6 w-48"
                style={{ minWidth: "180px" }}
                title={vendor.brandname}
              >
                <img
                  src={vendor.logo}
                  alt={vendor.brandname}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://cdn-icons-png.flaticon.com/512/747/747376.png";
                  }}
                />
                <span className="text-xs sm:text-sm  text-white max-w-[90px] sm:max-w-[110px] md:max-w-[140px] truncate">
                  {vendor.brandname}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Marquee Keyframes */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            will-change: transform;
          }
          @media (max-width: 640px) {
            .animate-marquee {
              animation-duration: 5s !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default VendorsLogo;
