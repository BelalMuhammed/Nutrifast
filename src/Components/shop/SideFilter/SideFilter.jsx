import React, { useEffect, useState, useMemo } from "react";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItemGroup,
  SidebarItems,
  Checkbox,
} from "flowbite-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { axiosInstance } from "../../../Network/interceptors";
import filterLogic from "../../../utlis/filterLogic";

// Custom handle with tooltip
const HandleWithTooltip = ({ value, ...restProps }) => (
  <Tooltip overlay={`${value} cal`} placement='top'>
    <Slider.Handle value={value} {...restProps} />
  </Tooltip>
);

function SideFilter({ products = [], onFilter }) {
  const [filters, setFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
    CaloriesRange: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
    CaloriesRange: [0, 500],
  });

  // Calculate min/max from API once
  const caloriesMin = useMemo(
    () =>
      filters.CaloriesRange.length
        ? Math.min(...filters.CaloriesRange.map((r) => r.min ?? 0))
        : 0,
    [filters.CaloriesRange]
  );

  const caloriesMax = useMemo(
    () =>
      filters.CaloriesRange.length
        ? Math.max(
            ...filters.CaloriesRange.map((r) => (r.max === null ? 1000 : r.max))
          )
        : 500,
    [filters.CaloriesRange]
  );

  // Fetch filters from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axiosInstance.get("/filters");
        setFilters((prev) => ({
          ...prev,
          ...res.data,
        }));

        // Set default CaloriesRange if API has data
        if (res.data.CaloriesRange?.length) {
          const min = Math.min(
            ...res.data.CaloriesRange.map((r) => r.min ?? 0)
          );
          const max = Math.max(
            ...res.data.CaloriesRange.map((r) =>
              r.max === null ? 1000 : r.max
            )
          );
          setSelectedFilters((prev) => ({
            ...prev,
            CaloriesRange: [min, max],
          }));
        }
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
    <Sidebar className='bg-white rounded-xl shadow-lg max-w-xs w-full p-0 border border-gray-100'>
      <div className='px-6 pt-6 pb-2'>
        <h2 className='text-2xl font-bold text-app-secondary mb-6 text-center tracking-tight'>
          Product Filters
        </h2>
      </div>
      <div className='flex flex-col gap-3 px-2'>
        {Object.keys(filters)
          .filter((group) => group !== "CaloriesRange")
          .map((group) => (
            <SidebarCollapse
              key={group}
              label={
                <span className='capitalize tracking-wide text-base font-semibold'>
                  {group.replace(/([A-Z])/g, " $1").trim()}
                </span>
              }
              className='border border-gray-100 rounded-xl mb-2 bg-white shadow-sm'>
              <div className='flex flex-col gap-2 px-2 py-2'>
                {(filters[group] ?? []).map((item) => {
                  const value =
                    item.min !== undefined
                      ? { min: item.min, max: item.max }
                      : item.name;
                  return (
                    <label
                      key={item.id || item.name}
                      className='flex items-center gap-2 text-base text-gray-700 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100'>
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
                        className='accent-green-600 w-5 h-5'
                      />
                      <span className='ml-2 font-medium text-app-secondary'>
                        {item.name}
                      </span>
                      {item.min !== undefined && (
                        <span className='ml-2 text-xs text-gray-500'>
                          ({item.min} - {item.max} cal)
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </SidebarCollapse>
          ))}
      </div>
      <div className='px-2 pb-6'>
        <section className='bg-white rounded-xl border border-gray-100 shadow-sm p-4 mt-2'>
          <h3 className='text-base font-bold text-app-secondary mb-4 border-b border-gray-100 pb-2 tracking-wide'>
            Calories Range
          </h3>
          <div className='flex flex-col gap-2 px-2'>
            <Slider
              range
              min={caloriesMin}
              max={caloriesMax}
              step={10}
              value={selectedFilters.CaloriesRange}
              onChange={handleCaloriesChange}
              trackStyle={[
                { backgroundColor: "#16a34a", height: 8, borderRadius: 4 },
              ]}
              railStyle={{
                backgroundColor: "#e5e7eb",
                height: 8,
                borderRadius: 4,
              }}
              handleStyle={[
                {
                  borderColor: "#16a34a",
                  backgroundColor: "#16a34a",
                  width: 24,
                  height: 24,
                  marginTop: -8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                },
                {
                  borderColor: "#16a34a",
                  backgroundColor: "#16a34a",
                  width: 24,
                  height: 24,
                  marginTop: -8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                },
              ]}
              handleRender={(node, props) => (
                <Tooltip overlay={`${props.value} cal`} placement='top'>
                  {node}
                </Tooltip>
              )}
            />
            <div className='flex justify-between text-sm mt-2'>
              <span className='font-semibold text-app-secondary bg-gray-50 rounded px-2 py-1 shadow'>
                {selectedFilters.CaloriesRange[0]} cal
              </span>
              <span className='font-semibold text-app-secondary bg-gray-50 rounded px-2 py-1 shadow'>
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
