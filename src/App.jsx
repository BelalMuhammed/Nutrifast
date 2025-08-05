import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaHeartBroken } from "react-icons/fa";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>



<FaHeartBroken size={24} className="text-red-600"/>



<div id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>What is Flowbite?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <div>
        <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox" classname="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown checkbox <svg classname="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="{2}" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <div id="dropdownDefaultCheckbox" classname="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
          <ul classname="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
            <li>
              <div classname="flex items-center">
                <input id="checkbox-item-1" type="checkbox" defaultvalue classname="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlfor="checkbox-item-1" classname="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
              </div>
            </li>
            <li>
              <div classname="flex items-center">
                <input defaultchecked id="checkbox-item-2" type="checkbox" defaultvalue classname="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlfor="checkbox-item-2" classname="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
              </div>
            </li>
            <li>
              <div classname="flex items-center">
                <input id="checkbox-item-3" type="checkbox" defaultvalue classname="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlfor="checkbox-item-3" classname="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
      <span>Is there a Figma file available?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <div>
        <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheck" classname="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown checkbox <svg classname="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="{2}" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <div id="dropdownDefaultCheck" classname="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
          <ul classname="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
            <li>
              <div classname="flex items-center">
                <input id="checkbox-item-1" type="checkbox" defaultvalue classname="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlfor="checkbox-item-1" classname="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
              </div>
            </li>
            <li>
              <div classname="flex items-center">
                <input defaultchecked id="checkbox-item-2" type="checkbox" defaultvalue classname="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlfor="checkbox-item-2" classname="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
              </div>
            </li>
            <li>
              <div classname="flex items-center">
                <input id="checkbox-item-3" type="checkbox" defaultvalue classname="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlfor="checkbox-item-3" classname="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <h2 id="accordion-collapse-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
      <span>What are the differences between Flowbite and Tailwind UI?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
    <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
      <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
        <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
        <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
      </ul>
    </div>
  </div>
</div>



    </>
  )
}

export default App
