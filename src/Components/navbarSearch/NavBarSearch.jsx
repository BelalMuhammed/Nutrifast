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
    <div className="relative w-64">
      <div className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm transition-all duration-300 focus-within:shadow-md">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          className="flex-1 outline-none text-sm"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute left-0 mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden z-50 animate-fadeIn">
          {suggestionsLoading ? (
            <li className="px-4 py-2 text-gray-500 text-sm">Loading...</li>
          ) : (
            suggestions.map((item) => (
              <li
                key={item.id}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  dispatch(clearSuggestions());
                }}
              >
                {item.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
