import { FiSliders } from "react-icons/fi";

function MobileFilterButton({ onClick }) {
  return (
    <div className='fixed bottom-8 right-6 z-30'>
      <button
        onClick={onClick}
        className='bg-app-primary hover:bg-app-tertiary text-white rounded-full shadow-lg px-6 py-3 font-semibold flex items-center gap-2 transition-all duration-200 border-2 border-white'>
        <FiSliders size={20} />
        Filters
      </button>
    </div>
  );
}

export default MobileFilterButton;
