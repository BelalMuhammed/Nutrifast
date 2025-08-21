import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/Axios";

const VendorsLogo = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/vendors");
        setVendors(res.data);
      } catch {
        setError("Failed to load vendors");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  if (loading) {
    return (
      <div className='text-center py-8 text-app-primary'>
        Loading vendors...
      </div>
    );
  }
  if (error) {
    return <div className='text-center py-8 text-red-500'>{error}</div>;
  }

  return (
    <div className='w-full py-8 bg-white rounded-2xl shadow border border-gray-100 flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          className='flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-1 sm:p-2 bg-white hover:bg-app-primary/5 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 group'>
          <div className='flex items-center justify-center w-full h-16 sm:h-20'>
            <img
              src={vendor.logo}
              alt={vendor.brandname}
              className='max-w-full max-h-full object-contain rounded transition-all duration-200 group-hover:scale-105'
              loading='lazy'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/747/747376.png";
              }}
            />
          </div>
          <span className='text-[11px] sm:text-xs text-app-primary font-semibold text-center truncate w-full mt-2'>
            {vendor.brandname}
          </span>
        </div>
      ))}
    </div>
  );
};

export default VendorsLogo;
