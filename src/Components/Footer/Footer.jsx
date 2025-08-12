import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className='bg-white border-t border-app-quaternary text-app-tertiary px-4 md:px-20 py-10'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16'>
        {/* Policy */}
        <div className='flex flex-col items-center md:items-start gap-4'>
          <a
            href='#'
            className='text-base font-semibold hover:underline transition'>
            Privacy Policy
          </a>
        </div>
        {/* Center Section: Social & Copyright */}
        <div className='flex flex-col items-center gap-4'>
          <a
            href='#'
            className='text-base font-semibold hover:underline transition'>
            Terms of Service
          </a>
          <div className='flex space-x-4 text-xl'>
            <a href='#' className='hover:text-app-primary transition'>
              <FaFacebookF />
            </a>
            <a href='#' className='hover:text-app-primary transition'>
              <FaTwitter />
            </a>
            <a href='#' className='hover:text-app-primary transition'>
              <FaInstagram />
            </a>
          </div>
          <p className='text-sm font-medium text-center text-app-quaternary'>
            © 2025 NutriFast. All rights reserved.
          </p>
        </div>
        {/* FAQ */}
        <div className='flex flex-col items-center md:items-end gap-4'>
          <a
            href='#'
            className='text-base font-semibold hover:underline transition'>
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
