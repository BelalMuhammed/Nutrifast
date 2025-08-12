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
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="app-container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-8 text-app-secondary">
        Customer Favorites
      </h2>
      <Slider {...settings}>
        {CustomerFavorites.map((fav) => (
          <div key={fav.id} className="px-3">
            <CustomerFavCard fav={fav} />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default CustomerFavorites;
