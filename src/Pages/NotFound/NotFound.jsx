import { useNavigate } from "react-router-dom";
import Button from "../../Components/shared/Buttons/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-app-quaternary/20 flex flex-col items-center justify-start pt-12 sm:pt-20 text-center px-4'>
      <div className='bg-white/95 rounded-3xl  px-8 py-10 flex flex-col items-center max-w-lg w-full mt-0'>
        <svg
          width='60'
          height='60'
          viewBox='0 0 60 60'
          fill='none'
          className='mb-3 animate-float'>
          <circle
            cx='30'
            cy='30'
            r='28'
            fill='#E6F4EA'
            stroke='#4ADE80'
            strokeWidth='2'
          />
          <path
            d='M20 38c2-2 6-2 8 0m4-10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
            stroke='#22C55E'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <h1 className='text-[70px] md:text-[100px] font-extrabold text-app-primary mb-1 select-none tracking-tight leading-none drop-shadow-sm'>
          404
        </h1>
        <h2 className='text-2xl md:text-3xl font-semibold mb-2 text-app-secondary'>
          Oops! Page Not Found
        </h2>
        <p className='text-gray-500 mb-8 max-w-md text-base md:text-lg'>
          Sorry, the page you are looking for doesn't exist, was removed, or is
          temporarily unavailable.
        </p>
        <Button
          text='Go Back Home'
          onClick={() => navigate("/")}
          className='w-full max-w-xs bg-app-primary text-white rounded-xl py-3 text-lg font-bold shadow hover:bg-app-tertiary transition'
        />
      </div>
    </div>
  );
}
