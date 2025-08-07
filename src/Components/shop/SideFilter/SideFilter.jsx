import {
  Sidebar,
  SidebarCollapse,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { Checkbox } from "flowbite-react";

const departments = [
  "Bakery",
  "Dry food",
  "Meats",
  "Dairy Products",
  "Vegetables",
  "Fruits",
  "Snacks",
  "Meals",
];

const dietTypes = [
  "Plant-Based",
  "Keto",
  "Low FODMAP",
  "Balanced low-carb",
  "Paleo",
];

const medicalConditions = ["HTN", "Pregnant", "Diabetes", "Anemia", "Favism"];

const allergens = [
  "Gluten",
  "Dairy",
  "Lactose",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Soya",
];

function SideFilter() {
  return (
    <Sidebar
      className='bg-white  rounded-md  max-w-xs w-full p-4'
      aria-label='Sidebar with filters'>
      <SidebarItems className='bg-white '>
        <SidebarItemGroup className='bg-white '>
          {/* Departments Section */}
          <SidebarCollapse
            label='Department'
            className='font-semibold text-gray-800 border border-gray-200 rounded-xl mb-4 bg-gray-50'>
            <div className='flex flex-col gap-3 px-3 py-2'>
              {departments.map((dept) => (
                <label
                  key={dept}
                  className='flex items-center gap-2 text-sm text-gray-700'>
                  <Checkbox />
                  {dept}
                </label>
              ))}
            </div>
          </SidebarCollapse>

          {/* Diet Types Section */}
          <SidebarCollapse
            label='Diet Types'
            className='font-semibold text-gray-800 border border-gray-200 rounded-xl mb-4 bg-gray-50'>
            <div className='flex flex-col gap-3 px-3 py-2'>
              {dietTypes.map((type) => (
                <label
                  key={type}
                  className='flex items-center gap-2 text-sm text-gray-700'>
                  <Checkbox />
                  {type}
                </label>
              ))}
            </div>
          </SidebarCollapse>

          {/* Medical Conditions Section */}
          <SidebarCollapse
            label='Medical Conditions'
            className='font-semibold text-gray-800 border border-gray-200 rounded-xl mb-4 bg-gray-50'>
            <div className='flex flex-col gap-3 px-3 py-2'>
              {medicalConditions.map((condition) => (
                <label
                  key={condition}
                  className='flex items-center gap-2 text-sm text-gray-700'>
                  <Checkbox />
                  {condition}
                </label>
              ))}
            </div>
          </SidebarCollapse>

          {/* Allergens Section */}
          <SidebarCollapse
            label='Allergens'
            className='font-semibold text-gray-800 border border-gray-200 rounded-xl mb-4 bg-gray-50'>
            <div className='flex flex-col gap-3 px-3 py-2'>
              {allergens.map((allergen) => (
                <label
                  key={allergen}
                  className='flex items-center gap-2 text-sm text-gray-700'>
                  <Checkbox />
                  {allergen}
                </label>
              ))}
            </div>
          </SidebarCollapse>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default SideFilter;
