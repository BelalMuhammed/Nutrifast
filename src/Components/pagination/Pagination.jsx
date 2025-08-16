import React from "react";
import { Pagination } from "flowbite-react";

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center mt-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
