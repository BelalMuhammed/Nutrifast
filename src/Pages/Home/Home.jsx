import VendorsLogo from "@/Components/vendors/VendorsLogo";
import Categories from "../../Components/homepage/categories/Categories";
import CustomerFavorites from "../../Components/homepage/customerFavorites/CustomerFavorites";
import HeroSection from "../../Components/homepage/heroSection/HeroSection";
import WhyChooseNutriFast from "../../Components/whyChooseNutriFast/WhyChooseNutriFast";
import OurStory from "../../Components/homepage/OurStory/OurStory";

function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <CustomerFavorites />
      <WhyChooseNutriFast />
      <VendorsLogo />
      <OurStory />
    </>
  );
}

export default Home;
