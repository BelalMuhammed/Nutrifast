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
  <Tooltip overlay={`${value} cal`} placement="top">
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
            ...filters.CaloriesRange.map((r) =>
              r.max === null ? 1000 : r.max
            )
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
          const min = Math.min(...res.data.CaloriesRange.map((r) => r.min ?? 0));
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
    <Sidebar
      className="bg-white rounded-md max-w-xs w-full p-4"
      aria-label="Sidebar with filters"
    >
      <SidebarItems className="bg-white">
        <SidebarItemGroup className="bg-white">
          {Object.keys(filters).map((group) => (
            <SidebarCollapse
              key={group}
              label={group}
              className="font-semibold text-gray-800 border border-gray-200 rounded-xl mb-4 bg-gray-50"
            >
              <div className="flex flex-col gap-3 px-3 py-2">
                {group === "CaloriesRange" ? (
                  <div className="px-2">
                    <Slider
                      range
                      min={caloriesMin}
                      max={caloriesMax}
                      step={10}
                      value={selectedFilters.CaloriesRange}
                      onChange={handleCaloriesChange}
                      trackStyle={[{ backgroundColor: "#16a34a" }]}
                      handleStyle={[
                        { borderColor: "#16a34a", backgroundColor: "#16a34a" },
                        { borderColor: "#16a34a", backgroundColor: "#16a34a" },
                      ]}
                      handleRender={(node, props) => (
                        <Tooltip overlay={`${props.value} cal`} placement="top">
                          {node}
                        </Tooltip>
                      )}
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span>{selectedFilters.CaloriesRange[0]} cal</span>
                      <span>{selectedFilters.CaloriesRange[1]} cal</span>
                    </div>
                  </div>
                ) : (
                  (filters[group] ?? []).map(({ id, name, min, max }) => (
                    <label
                      key={id}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Checkbox
                        checked={selectedFilters[group]?.some(
                          (item) =>
                            JSON.stringify(item) ===
                            JSON.stringify(min !== undefined ? { min, max } : name)
                        )}
                        onChange={() =>
                          handleCheckboxChange(
                            group,
                            name,
                            min !== undefined ? { min, max } : null
                          )
                        }
                      />
                      {name}
                    </label>
                  ))
                )}
              </div>
            </SidebarCollapse>
          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default SideFilter;
