import { motion } from "framer-motion";
import banner from "../../../assets/banner.png";

function HeroSection() {
  return (
    <section className='relative w-full min-h-[448px] h-[68vh] md:h-[78vh] flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <img
        src={banner}
        alt='Healthy Food'
        className='absolute inset-0 w-full h-full object-cover object-center z-0'
        style={{ filter: "brightness(0.65) blur(0px)" }}
      />
      {/* Overlay for readability */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-white/0 z-10' />
      {/* Content */}
      <motion.div
        className='relative z-20 flex flex-col items-center justify-center text-center w-full px-4'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-5 leading-tight tracking-tight'>
          Your Journey to Wellness Starts Here
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className='text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto font-semibold drop-shadow'>
          Discover a curated selection of organic produce, wholesome snacks, and
          nutritional supplements to fuel your healthy lifestyle.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className='btn-app text-base md:text-lg px-8 py-3 font-bold shadow-lg'
          onClick={() => (window.location.href = "/shop")}>
          Shop All Products
        </motion.button>
      </motion.div>
    </section>
  );
}

export default HeroSection;
