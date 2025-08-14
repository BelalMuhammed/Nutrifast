import { Button } from "flowbite-react";
import { FiMenu } from "react-icons/fi";

function MobileFilterButton({ onClick }) {
  return (
    <div className='fixed bottom-8 left-6 z-30'>
      <Button
        onClick={onClick}
        color='success'
        className='rounded-full shadow-lg px-6 py-2 font-medium flex items-center gap-2 bg-white cursor-pointer'>
        <FiMenu size={20} />
        Filters
      </Button>
    </div>
  );
}

export default MobileFilterButton;
