import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 bg-app-primary hover:bg-app-tertiary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group'
          aria-label='Scroll to top'>
          <FiArrowUp className='text-xl group-hover:animate-bounce' />
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
