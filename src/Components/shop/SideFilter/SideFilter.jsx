import {
  Sidebar,
  SidebarCollapse,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { Checkbox } from "flowbite-react";

let Categories = [
  "Healthy Bakery",
  "Whole Grains & Cereals",
  "Meats & Poultry",
  "Dairy Products",
  "Fresh Vegetables",
  "Fresh Fruits",
  "Healthy Snacks",
  "Prepared Diet Meals",
];
let DietTypes = [
  "Plant-Based",
  "Keto-Friendly",
  "Low FODMAP",
  "Balanced Low-Carb",
  "Paleo",
  "Vegan",
  "High-Protein",
  "Gluten-Free",
  "Dairy-Free",
];
let MedicalConditions = [
  "Hypertension",
  "Pregnancy Nutrition",
  "Diabetes",
  "Iron-Deficiency Anemia",
  "Favism",
  "High Cholesterol",
];
let Allergens = [
  "Gluten",
  "Dairy",
  "Lactose",
  "Eggs",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Soy",
  "Sesame",
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
            label='Categories'
            className='font-semibold text-gray-800 border border-gray-200 rounded-xl mb-4 bg-gray-50'>
            <div className='flex flex-col gap-3 px-3 py-2'>
              {Categories.map((dept) => (
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
              {DietTypes.map((type) => (
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
              {MedicalConditions.map((condition) => (
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
              {Allergens.map((allergen) => (
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
