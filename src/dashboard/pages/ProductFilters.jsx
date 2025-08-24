import React, { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../Network/interceptors";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiX,
  FiRotateCw,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";

function ProductFilters() {
  const [filters, setFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
  });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    edit: false,
    delete: false,
    add: false,
  });
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    min: "",
    max: "",
    image: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    type: "",
    item: null,
    category: null,
  });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Fetch filters from API
  const fetchFilters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/filters");
      setFilters(
        response.data || {
          Categories: [],
          DietTypes: [],
          MedicalConditions: [],
          Allergens: [],
        }
      );
    } catch (error) {
      console.error("Error fetching filters:", error);
      showToastMessage("Failed to fetch filters", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const handleEdit = (category, item) => {
    setConfirmDialog({
      show: true,
      type: "edit",
      item,
      category,
      message: `Are you sure you want to edit "${item.name}"?`,
    });
  };

  const handleConfirmEdit = () => {
    const { item, category } = confirmDialog;
    setEditingItem({ category, ...item });
    setConfirmDialog({ show: false, type: "", item: null, category: null });
  };

  const handleSaveEdit = async () => {
    try {
      setActionLoading((prev) => ({ ...prev, edit: true }));

      // Create the updated item without the category property
      const { category, ...itemToUpdate } = editingItem;

      // For JSON Server, we need to update the entire filters object
      // Get current filters, update the specific item, then PUT the whole object
      const currentFilters = { ...filters };
      const categoryItems = currentFilters[category].map((item) =>
        item.id === editingItem.id ? { ...itemToUpdate } : item
      );
      currentFilters[category] = categoryItems;

      // Update via API - JSON Server expects PUT /filters with entire object
      await axiosInstance.put("/filters", currentFilters);

      // Update local state after successful API call
      setFilters(currentFilters);

      setEditingItem(null);
      showToastMessage("Filter updated successfully", "success");
    } catch (error) {
      console.error("Error updating filter:", error);
      showToastMessage(
        error.response?.data?.message ||
        "Failed to update filter. Please try again.",
        "error"
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const handleDelete = async (category, itemId) => {
    const item = filters[category].find((item) => item.id === itemId);
    setConfirmDialog({
      show: true,
      type: "delete",
      item,
      category,
      itemId,
      message: `Are you sure you want to delete "${item?.name}"? This action cannot be undone.`,
    });
  };

  const handleConfirmDelete = async () => {
    const { category, itemId } = confirmDialog;
    try {
      setActionLoading((prev) => ({ ...prev, delete: true }));

      // For JSON Server, we need to update the entire filters object
      // Remove the item from the category and PUT the whole object
      const currentFilters = { ...filters };
      currentFilters[category] = currentFilters[category].filter(
        (item) => item.id !== itemId
      );

      // Update via API - JSON Server expects PUT /filters with entire object
      await axiosInstance.put("/filters", currentFilters);

      // Update local state after successful API call
      setFilters(currentFilters);
      setConfirmDialog({ show: false, type: "", item: null, category: null });

      showToastMessage("Filter deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting filter:", error);
      showToastMessage(
        error.response?.data?.message ||
        "Failed to delete filter. Please try again.",
        "error"
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleAddNew = async () => {
    try {
      setActionLoading((prev) => ({ ...prev, add: true }));

      // Generate new ID - for JSON Server, we'll use string IDs like your data
      const newId = (
        Math.max(
          ...filters[selectedCategory].map((item) => parseInt(item.id) || 0)
        ) + 1
      ).toString();

      const itemToAdd = {
        id: newId,
        name: newItem.name,
        ...(newItem.min &&
          newItem.max && {
          min: parseInt(newItem.min),
          max: parseInt(newItem.max),
        }),
        // Add image field for Categories
        ...(selectedCategory === "Categories" && {
          image: newItem.image || "",
        }),
      };

      // For JSON Server, we need to update the entire filters object
      // Add the new item to the category and PUT the whole object
      const currentFilters = { ...filters };
      currentFilters[selectedCategory] = [
        ...currentFilters[selectedCategory],
        itemToAdd,
      ];

      // Update via API - JSON Server expects PUT /filters with entire object
      await axiosInstance.put("/filters", currentFilters);

      // Update local state after successful API call
      setFilters(currentFilters);

      setNewItem({ name: "", min: "", max: "", image: "" });
      setShowAddModal(false);
      showToastMessage("Filter added successfully", "success");
    } catch (error) {
      console.error("Error adding filter:", error);
      showToastMessage(
        error.response?.data?.message ||
        "Failed to add filter. Please try again.",
        "error"
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, add: false }));
    }
  };

  // Sync all filters to server (bulk update)
  const syncFiltersToServer = async () => {
    try {
      setLoading(true);
      await axiosInstance.put("/filters", filters);
      showToastMessage("All filters synced successfully", "success");
    } catch (error) {
      console.error("Error syncing filters:", error);
      showToastMessage("Failed to sync filters", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-app-primary'></div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Message */}
      {toast.show && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-sm font-semibold text-sm ${toast.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
            }`}>
          {toast.message}
        </div>
      )}

      <div className='min-h-screen  p-4 sm:p-6 lg:p-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-gradient-to-r from-app-primary to-app-secondary rounded-xl flex items-center justify-center shadow-sm'>
                  <FiEdit2 className='w-6 h-6 ' />
                </div>
                <div>
                  <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                    Manage Product Filters
                  </h1>
                  <p className='text-gray-600 text-sm sm:text-base font-medium'>
                    Add, edit, or remove filter categories and options
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <button
                  onClick={() => fetchFilters()}
                  disabled={loading}
                  className='bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 shadow-sm disabled:opacity-50'
                  title='Refresh filters'>
                  <FiRefreshCw
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
                <button
                  onClick={() => syncFiltersToServer()}
                  disabled={loading}
                  className='bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-sm disabled:opacity-50'
                  title='Sync all changes to server'>
                  <FiRotateCw className='w-5 h-5' />
                  Sync
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className='bg-app-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-app-primary/90 transition-all duration-300 flex items-center gap-2 shadow-sm'>
                  <FiPlus className='w-5 h-5' />
                  Add New Filter
                </button>
              </div>
            </div>
          </div>

          {/* Filter Categories */}
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'>
            {Object.entries(filters).map(([category, items]) => (
              <div
                key={category}
                className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='bg-gradient-to-r from-app-primary to-app-secondary p-4'>
                  <h3 className='text-lg font-bold'>
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <p className='text-app-primary/20 text-sm'>
                    {items.length} items
                  </p>
                </div>

                <div className='p-4 max-h-96 overflow-y-auto'>
                  {items.length === 0 ? (
                    <p className='text-gray-500 text-center py-8 text-sm'>
                      No items in this category
                    </p>
                  ) : (
                    <div className='space-y-3'>
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className='bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-app-primary/30 transition-all duration-200'>
                          <div className=''>
                            <div className='flex '>
                              {category === "Categories" && item.image && (
                                <div className='mb-2'>
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className='w-12 h-12 rounded-lg object-cover border border-gray-200'
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                </div>
                              )}



                              <div className="">
                                <h4 className='font-medium text-gray-800 text-sm  ms-2'>
                                  {item.name}
                                </h4>
                                {item.min !== undefined &&
                                  item.max !== undefined && (
                                    <p className='text-xs text-gray-500 mt-1'>
                                      {item.min} - {item.max} cal
                                    </p>
                                  )}
                                <div className='flex gap-2 ml-3'>
                                  <button
                                    onClick={() => handleEdit(category, item)}
                                    className='p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200'
                                    title='Edit'>
                                    <FiEdit2 className='w-4 h-4' />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(category, item.id)}
                                    className='p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200'
                                    title='Delete'>
                                    <FiTrash2 className='w-4 h-4' />
                                  </button>
                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold text-gray-800'>Edit Filter</h3>
              <button
                onClick={() => setEditingItem(null)}
                className='text-gray-500 hover:text-gray-700'>
                <FiX className='w-6 h-6' />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                />
              </div>

              {editingItem.category === "Categories" && (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Image URL
                  </label>
                  <input
                    type='url'
                    value={editingItem.image || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, image: e.target.value })
                    }
                    className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                    placeholder='https://example.com/image.jpg'
                  />
                </div>
              )}

              {editingItem.min !== undefined && (
                <>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Min Calories
                    </label>
                    <input
                      type='number'
                      value={editingItem.min}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          min: parseInt(e.target.value),
                        })
                      }
                      className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Max Calories
                    </label>
                    <input
                      type='number'
                      value={editingItem.max}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          max: parseInt(e.target.value),
                        })
                      }
                      className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                    />
                  </div>
                </>
              )}
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={() => setEditingItem(null)}
                disabled={actionLoading.edit}
                className='flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50'>
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={actionLoading.edit || !editingItem?.name?.trim()}
                className='flex-1 px-4 py-3 bg-app-primary text-white rounded-xl font-semibold hover:bg-app-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2'>
                {actionLoading.edit ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold text-gray-800'>
                Add New Filter
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewItem({ name: "", min: "", max: "", image: "" });
                }}
                className='text-gray-500 hover:text-gray-700'>
                <FiX className='w-6 h-6' />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'>
                  {Object.keys(filters).map((category) => (
                    <option key={category} value={category}>
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                  placeholder='Enter filter name'
                />
              </div>

              {selectedCategory === "Categories" && (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Image URL
                  </label>
                  <input
                    type='url'
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({ ...newItem, image: e.target.value })
                    }
                    className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                    placeholder='https://example.com/image.jpg'
                  />
                </div>
              )}

              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <input
                  type='checkbox'
                  id='hasRange'
                  checked={newItem.min !== "" || newItem.max !== ""}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setNewItem({ ...newItem, min: "", max: "" });
                    } else {
                      setNewItem({ ...newItem, min: "0", max: "100" });
                    }
                  }}
                />
                <label htmlFor='hasRange'>Has calorie range (optional)</label>
              </div>

              {(newItem.min !== "" || newItem.max !== "") && (
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Min Calories
                    </label>
                    <input
                      type='number'
                      value={newItem.min}
                      onChange={(e) =>
                        setNewItem({ ...newItem, min: e.target.value })
                      }
                      className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Max Calories
                    </label>
                    <input
                      type='number'
                      value={newItem.max}
                      onChange={(e) =>
                        setNewItem({ ...newItem, max: e.target.value })
                      }
                      className='w-full border-2 border-gray-300 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300'
                    />
                  </div>
                </div>
              )}
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewItem({ name: "", min: "", max: "", image: "" });
                }}
                disabled={actionLoading.add}
                className='flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50'>
                Cancel
              </button>
              <button
                onClick={handleAddNew}
                disabled={actionLoading.add || !newItem.name?.trim()}
                className='flex-1 px-4 py-3 bg-app-primary text-white rounded-xl font-semibold hover:bg-app-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2'>
                {actionLoading.add ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Adding...
                  </>
                ) : (
                  "Add Filter"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDialog.show && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md'>
            <div className='flex items-center gap-4 mb-4'>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${confirmDialog.type === "delete"
                  ? " text-red-600"
                  : " text-blue-600"
                  }`}>
                {confirmDialog.type === "delete" ? (
                  <FiAlertTriangle className='w-6 h-6' />
                ) : (
                  <FiEdit2 className='w-6 h-6' />
                )}
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-800'>
                  {confirmDialog.type === "delete"
                    ? "Confirm Delete"
                    : "Confirm Edit"}
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={() =>
                  setConfirmDialog({
                    show: false,
                    type: "",
                    item: null,
                    category: null,
                  })
                }
                className='flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300'>
                Cancel
              </button>
              <button
                onClick={
                  confirmDialog.type === "delete"
                    ? handleConfirmDelete
                    : handleConfirmEdit
                }
                disabled={actionLoading.delete}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 ${confirmDialog.type === "delete"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-app-primary text-white hover:bg-app-primary/90"
                  }`}>
                {actionLoading.delete && confirmDialog.type === "delete" ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    {confirmDialog.type === "delete" ? (
                      <FiTrash2 className='w-4 h-4' />
                    ) : (
                      <FiCheck className='w-4 h-4' />
                    )}
                    {confirmDialog.type === "delete" ? "Delete" : "Confirm"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductFilters;
