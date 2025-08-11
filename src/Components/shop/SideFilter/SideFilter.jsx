import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItemGroup,
  SidebarItems,
  Checkbox,
} from "flowbite-react";
import { axiosInstance } from "../../../Network/interceptors";
import filterLogic from "../../../utlis/filterLogic";

function SideFilter({ products = [], onFilter }) {
  const [filters, setFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
  });

  // Fetch filters from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axiosInstance.get("/filters");
        setFilters((prev) => ({
          ...prev,
          ...res.data,
        }));
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (group, name) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[group]?.includes(name);
      const updatedGroup = isSelected
        ? prev[group].filter((item) => item !== name)
        : [...prev[group], name];

      return { ...prev, [group]: updatedGroup };
    });
  };

  // Run filter logic when selectedFilters changes
  useEffect(() => {
    if (products.length === 0) return;
    const filteredProducts = filterLogic(products, selectedFilters);
    onFilter(filteredProducts); // Send filtered products to Shop
  }, [selectedFilters, products, onFilter]);

  return (
    <Sidebar
      className='bg-white rounded-md max-w-xs w-full p-4'
      aria-label='Sidebar with filters'>
      <SidebarItems className='bg-white'>
        <SidebarItemGroup className='bg-white'>
          {Object.keys(filters).map((group) => (
            <SidebarCollapse
              key={group}
              label={group}
              className='font-semibold text-gray-800 border border-gray-200 rounded-xl mb-4 bg-gray-50'>
              <div className='flex flex-col gap-3 px-3 py-2'>
                {(filters[group] ?? []).map(({ id, name }) => (
                  <label
                    key={id}
                    className='flex items-center gap-2 text-sm text-gray-700'>
                    <Checkbox
                      checked={selectedFilters[group]?.includes(name) || false}
                      onChange={() => handleCheckboxChange(group, name)}
                    />
                    {name}
                  </label>
                ))}
              </div>
            </SidebarCollapse>
          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default SideFilter;
