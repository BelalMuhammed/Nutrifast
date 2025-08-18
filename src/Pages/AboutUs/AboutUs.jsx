import { FaLeaf, FaCheck, FaHeart } from "react-icons/fa";

const AboutUs = () => (
  <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
    {/* Hero Section */}
    <section className='relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 bg-gradient-to-r from-app-primary/5 via-app-secondary/3 to-app-quaternary/5'></div>
      <div className='absolute top-20 left-10 w-32 h-32 bg-app-primary/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 right-10 w-40 h-40 bg-app-secondary/10 rounded-full blur-3xl'></div>

      <div className='relative container mx-auto px-4 py-16 lg:py-24'>
        <div className='text-center'>
          {/* Logo */}
          <div className='mb-8'>
            <div className='relative inline-block'>
              <img
                src='/src/assets/banner.png'
                alt='NutriFast Banner'
                className='w-40 h-40 mx-auto rounded-full shadow-2xl border-4 border-white object-cover'
              />
              <div className='absolute -inset-4 bg-gradient-to-r from-app-primary/20 to-app-secondary/20 rounded-full blur-lg -z-10'></div>
            </div>
          </div>

          {/* Title */}
          <div className='mb-8'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-app-secondary mb-4'>
              About{" "}
              <span className='text-app-primary bg-gradient-to-r from-app-primary to-app-secondary bg-clip-text text-transparent'>
                NutriFast
              </span>
            </h1>
            <div className='w-24 h-1 bg-gradient-to-r from-app-primary to-app-secondary mx-auto rounded-full mb-6'></div>
          </div>

          {/* Description */}
          <div className='max-w-4xl mx-auto mb-12'>
            <p className='text-xl md:text-2xl text-gray-700 leading-relaxed mb-6'>
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
            <p className='text-lg text-gray-600'>
              Join thousands of satisfied customers on their journey to better
              health
            </p>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            {/* Feature 1 */}
            <div className='group'>
              <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'>
                <div className='mb-6'>
                  <div className='relative'>
                    <div className='w-20 h-20 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg'>
                      <FaLeaf className='h-8 w-8 text-white' />
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-app-tertiary mb-3'>
                  Quality Ingredients
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  Fresh, organic, and locally sourced ingredients for maximum
                  nutrition and flavor
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className='group'>
              <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'>
                <div className='mb-6'>
                  <div className='relative'>
                    <div className='w-20 h-20 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg'>
                      <FaCheck className='h-8 w-8 text-white' />
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-app-tertiary mb-3'>
                  Healthy Recipes
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  Carefully crafted recipes designed by nutritionists for
                  optimal health benefits
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className='group'>
              <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'>
                <div className='mb-6'>
                  <div className='relative'>
                    <div className='w-20 h-20 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg'>
                      <FaHeart className='h-8 w-8 text-white' />
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-app-tertiary mb-3'>
                  Community Support
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
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
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Section Header */}
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-app-secondary mb-4'>
              Our Story
            </h2>
            <div className='w-16 h-1 bg-gradient-to-r from-app-primary to-app-secondary mx-auto rounded-full mb-6'></div>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Every great journey begins with a single step. Here's how
              NutriFast started its mission to revolutionize healthy eating.
            </p>
          </div>

          {/* Story Card */}
          <div className='relative'>
            <div className='bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
                {/* Image Side */}
                <div className='relative p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-app-primary/5 to-app-secondary/5'>
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
                <div className='p-8 lg:p-12 flex flex-col justify-center'>
                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-2xl md:text-3xl font-bold text-app-tertiary mb-4'>
                        Founded with Passion
                      </h3>
                      <p className='text-gray-700 text-lg leading-relaxed mb-6'>
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
                    <div className='space-y-4'>
                      <div className='flex items-start gap-4'>
                        <div className='w-2 h-2 bg-app-primary rounded-full mt-3 flex-shrink-0'></div>
                        <div>
                          <h4 className='font-bold text-app-tertiary mb-1'>
                            Fresh, locally sourced ingredients
                          </h4>
                          <p className='text-gray-600 text-sm'>
                            We partner with local farms to ensure the freshest,
                            highest quality ingredients in every meal.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-4'>
                        <div className='w-2 h-2 bg-app-secondary rounded-full mt-3 flex-shrink-0'></div>
                        <div>
                          <h4 className='font-bold text-app-tertiary mb-1'>
                            Innovative healthy recipes
                          </h4>
                          <p className='text-gray-600 text-sm'>
                            Our culinary team creates delicious recipes that are
                            both nutritious and satisfying.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-4'>
                        <div className='w-2 h-2 bg-app-primary rounded-full mt-3 flex-shrink-0'></div>
                        <div>
                          <h4 className='font-bold text-app-tertiary mb-1'>
                            Commitment to customer wellness
                          </h4>
                          <p className='text-gray-600 text-sm'>
                            Your health and satisfaction are at the heart of
                            everything we do.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-3 gap-6 pt-6 border-t border-gray-100'>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-app-primary mb-1'>
                          1000+
                        </div>
                        <div className='text-sm text-gray-600'>
                          Happy Customers
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-app-secondary mb-1'>
                          50+
                        </div>
                        <div className='text-sm text-gray-600'>
                          Healthy Recipes
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-app-primary mb-1'>
                          5★
                        </div>
                        <div className='text-sm text-gray-600'>
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
