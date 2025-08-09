import Slider from "react-slick";
import HomeCard from "../../homeCard/HomeCard";
import { getCategories } from "../../../api/categories";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Adjust based on how many you want visible
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
      <h2 className="text-2xl font-bold mb-8">Health Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id} className="px-3">
            <HomeCard category={category} />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Categories;
