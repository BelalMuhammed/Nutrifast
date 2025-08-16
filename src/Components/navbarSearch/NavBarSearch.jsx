import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import {
  fetchSearchSuggestions,
  clearSuggestions,
} from "../../Redux/slices/productSlice";

export default function NavBarSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?name=${searchTerm}`);
      dispatch(clearSuggestions());
    }
  };

  return (
    <div className='relative w-64'>
      <div className='flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white/80 backdrop-blur-md shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-app-primary focus-within:shadow-xl'>
        <FiSearch className='text-app-primary mr-3 text-lg' />
        <input
          type='text'
          className='flex-1 outline-none text-base bg-transparent placeholder-app-primary text-app-tertiary px-1'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          aria-label='Search products'
        />
      </div>

      {suggestions.length > 0 && (
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
                  navigate(`/product/${item.id}`);
                  dispatch(clearSuggestions());
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/product/${item.id}`);
                    dispatch(clearSuggestions());
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
