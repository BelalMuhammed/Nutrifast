"use client";
export function CustomerFavCard({ fav }) {
  return (
    <div className='flex flex-col w-64 h-[300px] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white'>
      <img
        src={fav.image}
        alt={fav.name}
        className='w-full h-48 object-cover'
      />
      <div className='flex flex-col flex-grow p-4'>
        <h5 className='text-base font-semibold text-gray-900 mb-1 truncate'>
          {fav.name}
        </h5>
        <p className='text-sm mb-3 flex flex-col'>
          <span className='text-app-tertiary font-semibold py-2 text-lg'>
            {fav.price} EGP
          </span>
          <span className='text-app-accent font-semibold '> From :  {fav.brand}</span>
        </p>
        <div className='flex-grow' />
      </div>
    </div>
  );
}

export default CustomerFavCard;
