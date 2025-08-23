import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function CancelConfirmDialog({ orderId, onConfirm }) {
  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = () => {
    onConfirm(orderId);
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3"
      >
        <FiX size={18} />
        Cancel Order
      </button>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX size={20} />
            </button>

            <div className="text-center">
              <FiX className="mx-auto mb-4 text-red-500" size={48} />
              <h3 className="mb-5 text-lg font-medium text-gray-700">
                Are you sure you want to cancel this order?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirm}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Confirm Cancelation
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold"
                >
                  No, Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
