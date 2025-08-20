import { FaLeaf, FaCheck, FaHeart } from "react-icons/fa";

const AboutUs = () => (
  <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
    {/* Hero Section */}
    <section className='relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 bg-gradient-to-r from-app-primary/5 via-app-secondary/3 to-app-quaternary/5'></div>
      <div className='absolute top-20 left-10 w-32 h-32 bg-app-primary/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 right-10 w-40 h-40 bg-app-secondary/10 rounded-full blur-3xl'></div>

      <div className='relative container mx-auto px-2 py-4 lg:py-6'>
        <div className='text-center'>
          {/* Logo */}
          <div className='mb-4'>
            <div className='relative inline-block'>
              <img
                src='/src/assets/banner.png'
                alt='NutriFast Banner'
                className='w-40 h-40 mx-auto rounded-full shadow border-4 border-white object-cover'
              />
              <div className='absolute -inset-4 bg-gradient-to-r from-app-primary/20 to-app-secondary/20 rounded-full blur-lg -z-10'></div>
            </div>
          </div>

          {/* Title */}
          <div className='mb-8'>
            <h1 className='text-lg sm:text-xl md:text-2xl font-extrabold mb-1'>
              <span className='text-app-primary'>About </span>
              <span className='text-app-tertiary'>NutriFast</span>
            </h1>
          </div>

          {/* Description */}
          <div className='max-w-4xl mx-auto mb-6'>
            <p className='text-base md:text-lg text-gray-700 leading-relaxed mb-2'>
              NutriFast is dedicated to providing{" "}
              <span className='font-bold text-app-primary'>
                healthy, delicious meals
              </span>{" "}
              and snacks for every lifestyle. Our mission is to make clean
              eating{" "}
              <span className='font-bold text-app-secondary'>
                easy, accessible, and enjoyable
              </span>{" "}
              for everyone.
            </p>
            <p className='text-base text-gray-600'>
              Join thousands of satisfied customers on their journey to better
              health
            </p>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto'>
            {/* Feature 1 */}
            <div className='group'>
              <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow hover:shadow-lg  border border-gray-100'>
                <div className='mb-3'>
                  <div className='relative'>
                    <div className='w-14 h-14 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow'>
                      <FaLeaf className='h-6 w-6 text-app-primary' />
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <h3 className='text-base font-bold text-app-tertiary mb-2'>
                  Quality Ingredients
                </h3>
                <p className='text-gray-600 text-xs leading-relaxed'>
                  Fresh, organic, and locally sourced ingredients for maximum
                  nutrition and flavor
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className='group'>
              <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow hover:shadow-lg  border border-gray-100'>
                <div className='mb-3'>
                  <div className='relative'>
                    <div className='w-14 h-14 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow'>
                      <FaCheck className='h-6 w-6 text-app-primary' />
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <h3 className='text-base font-bold text-app-tertiary mb-2'>
                  Healthy Recipes
                </h3>
                <p className='text-gray-600 text-xs leading-relaxed'>
                  Carefully crafted recipes designed by nutritionists for
                  optimal health benefits
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className='group'>
              <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow hover:shadow-lg  border border-gray-100'>
                <div className='mb-3'>
                  <div className='relative'>
                    <div className='w-14 h-14 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow'>
                      <FaHeart className='h-6 w-6 text-app-primary' />
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <h3 className='text-base font-bold text-app-tertiary mb-2'>
                  Community Support
                </h3>
                <p className='text-gray-600 text-xs leading-relaxed'>
                  A supportive community helping you achieve your health and
                  wellness goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Story Section */}
    <section className='py-6'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Section Header */}
          <div className='text-center mb-6'>
            <h2 className='text-xl md:text-2xl font-bold text-app-secondary mb-1'>
              Our Story
            </h2>
            <div className='w-10 h-1 bg-gradient-to-r from-app-primary to-app-secondary mx-auto rounded-full mb-3'></div>
            <p className='text-base text-gray-600 max-w-3xl mx-auto'>
              Every great journey begins with a single step. Here's how
              NutriFast started its mission to revolutionize healthy eating.
            </p>
          </div>

          {/* Story Card */}
          <div className='relative'>
            <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
                {/* Image Side */}
                <div className='relative p-4 flex items-center justify-center bg-gradient-to-br from-app-primary/5 to-app-secondary/5'>
                  <div className='relative'>
                    <img
                      src='/logo.png'
                      alt='NutriFast Logo'
                      className='w-48 h-48 rounded-2xl object-cover shadow-xl border-4 border-white'
                    />
                    <div className='absolute -inset-4 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-2xl blur-xl'></div>
                  </div>
                  {/* Decorative elements */}
                  <div className='absolute top-8 right-8 w-16 h-16 bg-app-primary/10 rounded-full'></div>
                  <div className='absolute bottom-8 left-8 w-12 h-12 bg-app-secondary/10 rounded-full'></div>
                </div>

                {/* Content Side */}
                <div className='p-4 lg:p-6 flex flex-col justify-center'>
                  <div className='space-y-3'>
                    <div>
                      <h3 className='text-lg md:text-xl font-bold text-app-tertiary mb-2'>
                        Founded with Passion
                      </h3>
                      <p className='text-gray-700 text-base leading-relaxed mb-3'>
                        Founded by passionate food lovers, NutriFast was born
                        out of a desire to help people achieve their health
                        goals without sacrificing taste. We believe in{" "}
                        <span className='font-semibold text-app-primary'>
                          transparency
                        </span>
                        ,{" "}
                        <span className='font-semibold text-app-secondary'>
                          sustainability
                        </span>
                        , and supporting our community through nutritious
                        choices.
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className='space-y-2'>
                      <div className='flex items-start gap-4'>
                        <div className='w-2 h-2 bg-app-primary rounded-full mt-3 flex-shrink-0'></div>
                        <div>
                          <h4 className='font-bold text-app-tertiary mb-0.5'>
                            Fresh, locally sourced ingredients
                          </h4>
                          <p className='text-gray-600 text-xs'>
                            We partner with local farms to ensure the freshest,
                            highest quality ingredients in every meal.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-4'>
                        <div className='w-2 h-2 bg-app-secondary rounded-full mt-3 flex-shrink-0'></div>
                        <div>
                          <h4 className='font-bold text-app-tertiary mb-0.5'>
                            Innovative healthy recipes
                          </h4>
                          <p className='text-gray-600 text-xs'>
                            Our culinary team creates delicious recipes that are
                            both nutritious and satisfying.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-4'>
                        <div className='w-2 h-2 bg-app-primary rounded-full mt-3 flex-shrink-0'></div>
                        <div>
                          <h4 className='font-bold text-app-tertiary mb-0.5'>
                            Commitment to customer wellness
                          </h4>
                          <p className='text-gray-600 text-xs'>
                            Your health and satisfaction are at the heart of
                            everything we do.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-3 gap-2 pt-3 border-t border-gray-100'>
                      <div className='text-center'>
                        <div className='text-lg font-bold text-app-primary mb-0.5'>
                          1000+
                        </div>
                        <div className='text-xs text-gray-600'>
                          Happy Customers
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg font-bold text-app-secondary mb-0.5'>
                          50+
                        </div>
                        <div className='text-xs text-gray-600'>
                          Healthy Recipes
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg font-bold text-app-primary mb-0.5'>
                          5★
                        </div>
                        <div className='text-xs text-gray-600'>
                          Customer Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AboutUs;
