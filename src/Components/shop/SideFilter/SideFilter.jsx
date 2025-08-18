import React, { useEffect, useState } from "react";
import { Sidebar, SidebarCollapse, Checkbox } from "flowbite-react";
import { FiX } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { axiosInstance } from "../../../Network/interceptors";
import filterLogic from "../../../utlis/filterLogic";

// Custom handle with tooltip for slider
const HandleWithTooltip = ({ value, ...restProps }) => (
  <Tooltip overlay={`${value} cal`} placement='top'>
    <Slider.Handle value={value} {...restProps} />
  </Tooltip>
);

function SideFilter({ products = [], onFilter, onClose = null }) {
  // Filter groups (excluding CaloriesRange)
  const [filters, setFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
  });

  // Selected filter values
  const [selectedFilters, setSelectedFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
    CaloriesRange: [0, 1000],
  });

  // Slider min/max (static)
  const caloriesMin = 0;
  const caloriesMax = 1000;

  // Fetch filter options from API (except CaloriesRange)
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
  const handleCheckboxChange = (group, name, extraData = null) => {
    setSelectedFilters((prev) => {
      const value = extraData || name;
      const isSelected = prev[group]?.some(
        (item) => JSON.stringify(item) === JSON.stringify(value)
      );
      const updatedGroup = isSelected
        ? prev[group].filter(
            (item) => JSON.stringify(item) !== JSON.stringify(value)
          )
        : [...prev[group], value];
      return { ...prev, [group]: updatedGroup };
    });
  };

  // Handle slider change
  const handleCaloriesChange = (range) => {
    setSelectedFilters((prev) => ({
      ...prev,
      CaloriesRange: range,
    }));
  };

  // Apply filters when selection changes
  useEffect(() => {
    if (products.length === 0) return;
    const filteredProducts = filterLogic(products, selectedFilters);
    onFilter(filteredProducts);
  }, [selectedFilters, products, onFilter]);

  return (
    <Sidebar className='bg-white rounded-xl shadow-sm w-full  border border-gray-100'>
      <div className='px-6 pt-6 pb-2 relative'>
        {onClose && (
          <button
            onClick={onClose}
            className='absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group'
            aria-label='Close filters'>
            <FiX className='text-xl text-gray-500 group-hover:text-gray-700' />
          </button>
        )}
        <h2 className='text-2xl font-bold text-app-secondary mb-6 text-center tracking-tight'>
          Product Filters
        </h2>
      </div>
      <div className='flex flex-col gap-3 px-3'>
        {Object.keys(filters).map((group) => (
          <SidebarCollapse
            key={group}
            label={
              <span className='capitalize tracking-wide text-md font-semibold'>
                {group.replace(/([A-Z])/g, " $1").trim()}
              </span>
            }
            className='border border-gray-100 rounded-xl mb-2 bg-white shadow-sm'>
            <div className='flex flex-col gap-2 px-3 py-2'>
              {(filters[group] ?? []).map((item, idx) => {
                const value =
                  item.min !== undefined
                    ? { min: item.min, max: item.max }
                    : item.name;
                // Use id if available, else name, else index+value string
                const key =
                  item.id || item.name || `${idx}-${JSON.stringify(value)}`;
                return (
                  <label
                    key={key}
                    className='flex items-center gap-3 text-lg text-app-primary bg-gray-50 rounded-lg px-4 py-2.5 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100'>
                    <Checkbox
                      checked={selectedFilters[group]?.some(
                        (selected) =>
                          JSON.stringify(selected) === JSON.stringify(value)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          group,
                          item.name,
                          item.min !== undefined
                            ? { min: item.min, max: item.max }
                            : null
                        )
                      }
                      className='text-app-primary w-5 h-5 flex-shrink-0 accent-app-primary'
                      style={{
                        accentColor: "var(--color-primary)",
                        borderColor: "var(--color-primary)",
                      }}
                    />
                    <div className='flex flex-col flex-1 min-w-0'>
                      <span className='font-medium text-sm text-gray-700 truncate'>
                        {item.name}
                      </span>
                      {item.min !== undefined && (
                        <span className='text-xs text-gray-500 mt-0.5'>
                          ({item.min} - {item.max} cal)
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </SidebarCollapse>
        ))}
      </div>
      <div className='px-3 pb-6'>
        <section className='bg-white rounded-xl border border-gray-100 shadow-sm p-5 mt-2'>
          <h3 className='text-base font-bold text-app-secondary mb-4 pb-2 tracking-wide'>
            Calories Range
          </h3>
          <div className='flex flex-col gap-3 px-2'>
            <Slider
              range
              min={caloriesMin}
              max={caloriesMax}
              step={10}
              value={selectedFilters.CaloriesRange}
              onChange={handleCaloriesChange}
              handleRender={(node, props) => (
                <Tooltip overlay={`${props.value} cal`} placement='top'>
                  {node}
                </Tooltip>
              )}
            />
            <div className='flex justify-between text-sm mt-3'>
              <span className='font-semibold text-app-primary bg-gray-50 rounded-lg px-3 py-2 shadow-sm border border-gray-100'>
                {selectedFilters.CaloriesRange[0]} cal
              </span>
              <span className='font-semibold text-app-primary bg-gray-50 rounded-lg px-3 py-2 shadow-sm border border-gray-100'>
                {selectedFilters.CaloriesRange[1]} cal
              </span>
            </div>
          </div>
        </section>
      </div>
    </Sidebar>
  );
}

export default SideFilter;
