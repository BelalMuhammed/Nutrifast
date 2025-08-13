const AboutUs = () => (
  <div className='w-full min-h-screen bg-gradient-to-br from-green-50 to-white py-0'>
    {/* Hero Section */}
    <div className='w-full flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-r from-app-primary/10 to-app-quaternary/10'>
      <img
        src='/src/assets/banner.png'
        alt='NutriFast Banner'
        className='w-32 h-32 mb-4 rounded-full shadow-lg border-4 border-app-primary object-cover'
      />
      <h1 className='text-4xl md:text-5xl font-extrabold text-app-tertiary mb-2 text-center'>
        About NutriFast
      </h1>
      <p className='text-lg md:text-xl text-gray-700 text-center max-w-2xl mb-4'>
        NutriFast is dedicated to providing healthy, delicious meals and snacks
        for every lifestyle. Our mission is to make clean eating easy,
        accessible, and enjoyable for everyone.
      </p>
      <div className='flex flex-wrap gap-4 justify-center mt-4'>
        <div className='flex flex-col items-center'>
          <span className='bg-app-primary text-white rounded-full p-3 mb-2 shadow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z'
              />
            </svg>
          </span>
          <span className='text-app-tertiary font-semibold'>
            Quality Ingredients
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='bg-app-primary text-white rounded-full p-3 mb-2 shadow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </span>
          <span className='text-app-tertiary font-semibold'>
            Healthy Recipes
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='bg-app-primary text-white rounded-full p-3 mb-2 shadow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
          </span>
          <span className='text-app-tertiary font-semibold'>
            Community Support
          </span>
        </div>
      </div>
    </div>
    {/* Story Section */}
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center'>
        <img
          src='/src/assets/logo.png'
          alt='NutriFast Logo'
          className='w-32 h-32 rounded-full object-cover border-2 border-app-primary shadow-md mb-4 md:mb-0'
        />
        <div>
          <h2 className='text-2xl font-bold text-app-tertiary mb-2'>
            Our Story
          </h2>
          <p className='text-gray-700 text-lg mb-2'>
            Founded by passionate food lovers, NutriFast was born out of a
            desire to help people achieve their health goals without sacrificing
            taste. We believe in transparency, sustainability, and supporting
            our community through nutritious choices.
          </p>
          <ul className='list-disc list-inside text-app-tertiary text-base font-semibold'>
            <li>Fresh, locally sourced ingredients</li>
            <li>Innovative healthy recipes</li>
            <li>Commitment to customer wellness</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;
