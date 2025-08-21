import VendorsLogo from "@/Components/vendors/VendorsLogo";
import Categories from "../../Components/homepage/categories/Categories";
import CustomerFavorites from "../../Components/homepage/customerFavorites/CustomerFavorites";
import HeroSection from "../../Components/homepage/heroSection/HeroSection";
import WhyChooseNutriFast from "../../Components/whyChooseNutriFast/WhyChooseNutriFast";

function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <CustomerFavorites />
      <WhyChooseNutriFast />
      <VendorsLogo />
    </>
  );
}

export default Home;
