import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import {
  fetchSearchSuggestions,
  clearSuggestions,
} from "../../Redux/slices/productSlice";

export default function NavBarSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { suggestions, suggestionsLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      dispatch(fetchSearchSuggestions(searchTerm));
    } else {
      dispatch(clearSuggestions());
    }
  }, [searchTerm, dispatch]);

  // Focus input when opening
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/shop?name=${searchTerm}`);
      dispatch(clearSuggestions());
      setSearchTerm("");
      setOpen(false);
    }
  };

  // Close input on blur unless suggestions dropdown is open
  const handleBlur = (e) => {
    // If focus moves to a suggestion, don't close
    if (e.relatedTarget && e.relatedTarget.getAttribute("role") === "button")
      return;
    setOpen(false);
  };

  return (
    <div className='relative w-64'>
      <div className='flex items-center border border-gray-200 rounded-full px-2 py-2 bg-white/80 backdrop-blur-md shadow-md transition-all duration-300'>
        <button
          type='button'
          aria-label={open ? "Close search" : "Open search"}
          className={`text-app-primary text-lg transition-all duration-300 ${
            open ? "mr-2" : "mx-auto"
          }`}
          onClick={() => setOpen((prev) => !prev)}
          tabIndex={0}>
          <FiSearch />
        </button>
        <input
          ref={inputRef}
          type='text'
          className={`flex-1 outline-none text-base bg-transparent placeholder-app-primary text-app-tertiary px-1 transition-all duration-300 ${
            open ? "w-full opacity-100 ml-2" : "w-0 opacity-0 p-0"
          }`}
          style={{ minWidth: open ? 120 : 0 }}
          placeholder={open ? "Search products..." : ""}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onBlur={handleBlur}
          aria-label='Search products'
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul className='absolute left-0 mt-2 w-full bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden z-50 animate-fadeIn border border-gray-100 transition-all duration-300'>
          {suggestionsLoading ? (
            <li className='px-4 py-2 text-gray-400 text-base'>Loading...</li>
          ) : (
            suggestions.map((item) => (
              <li
                key={item.id}
                className='px-4 py-2 text-base text-app-tertiary hover:bg-app-quaternary/80 hover:text-app-primary cursor-pointer transition-all duration-150'
                tabIndex={0}
                role='button'
                aria-label={`Go to ${item.name}`}
                onClick={() => {
                  navigate(`/shop?name=${item.name}`);
                  dispatch(clearSuggestions());
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/shop?name=${item.name}`);
                    dispatch(clearSuggestions());
                    setOpen(false);
                  }
                }}>
                {item.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
