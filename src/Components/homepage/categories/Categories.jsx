import Slider from "react-slick";
import HomeCard from "../../categoryCard/CategoryCard";
import { getCategories } from "../../../api/apiService";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.Categories))
      .catch((err) => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className='mx-auto py-12 bg-app-muted'>
      <div className='app-container '>
        <div className=' flex flex-col items-center justify-center mb-8'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight text-center mb-2 '>
            Explore by Category
          </h2>
          <div className='w-16 h-1 rounded-full bg-app-accent mb-2' />
          <p className='text-base md:text-lg text-app-secondary/80 text-center max-w-xl'>
            Find the perfect healthy option for your lifestyle from our curated
            categories.
          </p>
        </div>
        <div className='app-slider pb-12'>
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category.id} className='px-3'>
                <HomeCard category={category} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Categories;
