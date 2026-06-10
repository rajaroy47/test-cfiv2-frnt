import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiEye, 
  FiClock, 
  FiStar, 
  FiTrendingUp, 
  FiUsers,
  FiChevronRight,
  FiInfo,
  FiCalendar,
  FiAward
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

const ServiceCard = ({ service, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Destructure service data with safe fallbacks
  const {
    name = "Service Name",
    serviceImage = "/api/placeholder/400/300",
    shortDescription = "No description available",
    slug = "#",
    price = null,
    rating = null,
    duration = null,
    category = null,
    isPopular = false,
    isNew = false,
    studentsCount = null,
    tags = []
  } = service || {};

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, delay: index * 0.1 }
    },
    hover: {
      y: -8,
      transition: { duration: 0.2, type: "spring", stiffness: 300 }
    }
  };

  // Image loading placeholder
  const ImageSkeleton = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-300"
    >
      
      {/* Badge Container */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {isPopular && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full px-2.5 py-1 shadow-lg"
          >
            <FiStar className="text-white text-xs" />
            <span className="text-xs font-bold text-white">POPULAR</span>
          </motion.div>
        )}
        
        {isNew && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full px-2.5 py-1 shadow-lg"
          >
            <HiOutlineSparkles className="text-white text-xs" />
            <span className="text-xs font-bold text-white">NEW</span>
          </motion.div>
        )}
      </div>

      {/* Image Container with Zoom Effect */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-video">
        {!imageLoaded && <ImageSkeleton />}
        <motion.img
          src={serviceImage}
          alt={name}
          className={`h-full w-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Button on Hover */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="absolute bottom-3 right-3"
        >
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200">
            <FiEye className="text-slate-700 text-sm" />
          </button>
        </motion.div>
      </div>

      {/* Card Body Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Category and Metadata */}
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {category}
            </span>
          )}
          
          {duration && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <FiClock className="text-xs" />
              <span>{duration}</span>
            </div>
          )}
        </div>

        {/* Title with hover effect */}
        <Link to={`/service/${slug}`} className="block group-hover:no-underline">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2 flex-grow">
          {shortDescription}
        </p>

        {/* Stats Row */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3">
            {rating && (
              <div className="flex items-center gap-1">
                <FiStar className="text-amber-400 text-sm fill-current" />
                <span className="text-sm font-semibold text-slate-700">{rating}</span>
                <span className="text-xs text-slate-400">(124)</span>
              </div>
            )}
            
            {studentsCount && (
              <div className="flex items-center gap-1">
                <FiUsers className="text-slate-400 text-sm" />
                <span className="text-xs text-slate-600">{studentsCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {price && (
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through">₹{price}</span>
              <p className="text-sm font-bold text-green-600">Free</p>
            </div>
          )}
        </div>

        {/* Tags Row */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button with Animation */}
        <Link to={`/service/${slug}`} className="mt-5 block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-center text-sm font-semibold text-white shadow-md shadow-blue-600/20 overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FiInfo className="text-base" />
              <span>View Details</span>
              <FiChevronRight className={`text-base transition-all duration-300 ${
                isHovered ? 'translate-x-1' : ''
              }`} />
            </span>
            
            {/* Animated Button Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute transform rotate-45 bg-blue-600/5 w-20 h-20 -top-10 -right-10" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;