import React from "react";
import { FaSearch } from "react-icons/fa";

export default function EmptyState({ message = "No results found." }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center py-10 text-gray-500 animate-fade-in">
      <FaSearch className="text-5xl mb-4 animate-pulse text-gray-400" />
      <p className="text-xl font-medium">{message}</p>
    </div>
  );
}
