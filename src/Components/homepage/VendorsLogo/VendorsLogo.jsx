import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Api/Axios";

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
      <div className='w-full py-12 flex items-center justify-center'>
        <span className='text-app-primary font-semibold text-lg'>
          Loading vendor data...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className='text-center py-8 text-red-500'>{error}</div>;
  }

  return (
    <section className='w-full  py-10 '>
      <div className='text-center mb-8 px-2'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight mb-2 '>
          Our Local Vendor Partners
        </h2>
        <p className='text-gray-700 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed'>
          At NutriFast, we believe in the power of local products and proudly
          support Egyptian vendors. If you're a local supplier, we invite you to
          join our platform and showcase your healthy products. Let's grow
          together and make a real impact on healthy living in Egypt—become a
          valued partner in our journey!
        </p>
      </div>
      <div className='w-full lg:w-3/4 mx-auto flex flex-wrap items-center justify-center gap-6'>
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className='relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28  group cursor-pointer'>
            <div className='flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-app-primary shadow-md bg-white overflow-hidden transition-all duration-300 group-hover:scale-105'>
              <img
                src={vendor.logo}
                alt={vendor.brandname}
                className='w-full h-full object-cover rounded-full transition-all duration-300'
                loading='lazy'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/747/747376.png";
                }}
              />
            </div>
            <span
              className='absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-app-primary text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 pointer-events-none shadow-lg z-10 whitespace-nowrap'
              style={{ minWidth: "90px", textAlign: "center" }}>
              {vendor.brandname}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VendorsLogo;
