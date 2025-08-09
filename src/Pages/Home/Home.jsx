import banner from "../../assets/banner.png";
import Categories from "../../Components/homepage/categories/Categories";

function Home() {
  return (
    <>
      {/* Banner Section */}
      <section className="relative overflow-hidden ">
        <div className="absolute inset-0">
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[500px] px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Journey to Wellness Starts Here
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover a curated selection of organic produce, wholesome snacks,
              and nutritional supplements to fuel your healthy lifestyle.
            </p>
            <button className="btn-app">Shop All Products</button>
          </div>
        </div>
      </section>

      <Categories />
    </>
  );
}

export default Home;
