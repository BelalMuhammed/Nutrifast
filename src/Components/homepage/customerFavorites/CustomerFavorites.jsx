import Slider from "react-slick";
import HomeCard from "../../categoryCard/CategoryCard";
import { getCustomerFavorites } from "../../../api/apiService";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomerFavCard from "../../customerFavCard/CustomerFavCard";

function CustomerFavorites() {
  const [CustomerFavorites, setCustomerFavorites] = useState([]);

  useEffect(() => {
    getCustomerFavorites()
      .then((res) => setCustomerFavorites(res.data))
      .catch((err) => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className='app-container mx-auto py-8 sm:py-10 md:py-12'>
      <div className='flex flex-col items-center justify-center mb-6 sm:mb-8 px-4'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight text-center mb-2'>
          Customer Favorites
        </h2>
        <div className='w-12 sm:w-16 h-1 rounded-full bg-app-accent mb-2' />
        <p className='text-sm sm:text-base md:text-lg text-app-secondary/80 text-center max-w-xl leading-relaxed'>
          See what our customers love most! Discover top-rated healthy picks and
          trending products.
        </p>
      </div>
      <div className='app-slider pb-8 sm:pb-10 md:pb-12'>
        <Slider {...settings}>
          {CustomerFavorites.map((fav) => (
            <div key={fav.id} className='px-2 sm:px-3'>
              <CustomerFavCard fav={fav} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default CustomerFavorites;
