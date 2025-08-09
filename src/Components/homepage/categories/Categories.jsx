import HomeCard from "../../homeCard/HomeCard";
import { getCategories } from "../../../api/categories";
import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="categories flex">
      {categories.map((category) => (
        <HomeCard category={category} key={category.id} />
      ))}
    </section>
  );
}

export default Categories;
