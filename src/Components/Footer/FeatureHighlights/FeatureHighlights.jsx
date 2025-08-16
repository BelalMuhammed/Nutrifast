import {
  FaShippingFast,
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

function FeatureHighlights() {
  const features = [
    {
      icon: FaShippingFast,
      title: "Free Shipping",
      description: "On select items",
      descriptionColor: "text-app-quaternary",
    },
    {
      icon: FaPhoneAlt,
      title: "Give Us A Call",
      description: "+20 123 456 7890",
      descriptionColor: "text-app-accent",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      description: "support@nutrifast.com",
      descriptionColor: "text-app-accent",
    },
    {
      icon: FaHeart,
      title: "Community",
      description: "Shop with purpose",
      descriptionColor: "text-app-quaternary",
    },
  ];

  return (
    <div className='bg-app-primary/90 py-8 border-b border-white/10 mt-10'>
      <div className='max-w-7xl mx-auto px-4 md:px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='flex items-center gap-4'>
              <div className='bg-app-accent rounded-full p-3'>
                <feature.icon className='text-white text-xl' />
              </div>
              <div>
                <h4 className='font-bold text-white'>{feature.title}</h4>
                <p
                  className={`${feature.descriptionColor} text-sm font-medium`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureHighlights;
