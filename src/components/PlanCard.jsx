import React, { useState } from "react";
import { 
  FiCheck, 
  FiClock, 
  FiZap, 
  FiStar, 
  FiTrendingUp,
  FiShield,
  FiAward,
  FiGift,
  FiCreditCard,
  FiArrowRight
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { motion } from "framer-motion";

const PlanCard = ({ title, plan, onPurchase, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Gracefully destructure your updated backend schema metrics with safe fallbacks
  const {
    price = 0,
    features = [],
    discount = 0,
    isRecommended = false,
    isAllIncluded = false,
    validTill = null,
    popularBadge = "MOST POPULAR",
    icon = null,
    category = "standard",
    savings = 0,
  } = plan || {};

  // Compute pricing variants cleanly
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? Math.max(0, price - discount) : price;
  const savingsPercentage = hasDiscount ? Math.round((discount / price) * 100) : 0;

  // Dynamic color schemes based on plan type
  const getColorScheme = () => {
    if (isRecommended) {
      return {
        primary: "blue",
        gradient: "from-blue-600 to-indigo-600",
        light: "blue-50",
        border: "blue-200",
        text: "blue-700",
        badge: "bg-gradient-to-r from-blue-600 to-indigo-600"
      };
    } else if (isAllIncluded) {
      return {
        primary: "emerald",
        gradient: "from-emerald-600 to-teal-600",
        light: "emerald-50",
        border: "emerald-200",
        text: "emerald-700",
        badge: "bg-gradient-to-r from-emerald-600 to-teal-600"
      };
    } else {
      return {
        primary: "slate",
        gradient: "from-slate-600 to-slate-700",
        light: "slate-50",
        border: "slate-200",
        text: "slate-700",
        badge: "bg-gradient-to-r from-slate-600 to-slate-700"
      };
    }
  };

  const colors = getColorScheme();
  const IconComponent = icon || (isRecommended ? FiStar : isAllIncluded ? FiAward : FiTrendingUp);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, delay: index * 0.1 }
    },
    hover: {
      y: -8,
      transition: { duration: 0.2, type: "spring", stiffness: 300 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative flex flex-col rounded-2xl p-6 lg:p-8 bg-white transition-all duration-300 ${
        isRecommended
          ? `border-2 border-${colors.primary}-600 shadow-xl shadow-${colors.primary}-600/10 hover:shadow-2xl hover:shadow-${colors.primary}-600/20`
          : `border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300`
      }`}
    >
      {/* Badge Container */}
      {(isRecommended || isAllIncluded) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className={`${colors.badge} rounded-full px-4 py-1.5 shadow-lg flex items-center gap-1.5`}>
            <HiOutlineSparkles className="text-white text-xs" />
            <span className="text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap">
              {isRecommended ? popularBadge : "ALL-INCLUSIVE"}
            </span>
          </div>
        </div>
      )}

      {/* Icon Section */}
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-md`}>
          <IconComponent className="text-white text-xl" />
        </div>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3 py-1.5 shadow-lg">
              <div className="flex items-center gap-1">
                <FiGift className="text-white text-xs" />
                <span className="text-xs font-bold text-white">
                  Save {savingsPercentage}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Plan Title */}
      <div className="mb-4">
        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 capitalize flex items-center gap-2">
          {title}
          {category === "premium" && (
            <FiShield className="text-blue-500 text-sm" />
          )}
        </h3>
        <p className="text-xs text-slate-400 mt-1">Perfect for your needs</p>
      </div>

      {/* Pricing Section */}
      <div className="mb-6">
        <div className="flex items-baseline flex-wrap gap-2">
          <span className="text-2xl font-bold text-slate-500">₹</span>
          <span className="text-5xl font-extrabold tracking-tight text-slate-900">
            {finalPrice.toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <span className="text-base text-slate-400 line-through font-medium">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-medium text-slate-500">one-time payment</span>
          {savings > 0 && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Save ₹{savings.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Valid Till Timer */}
        {validTill && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
              <FiClock className="text-amber-600" />
              <span>Offer valid till: {new Date(validTill).toLocaleDateString("en-IN", { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Features List */}
      <div className="mb-8 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <FiCheck className="text-emerald-500 text-sm" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            WHAT'S INCLUDED
          </span>
        </div>
        <ul className="flex flex-col gap-3">
          {features?.map((feature, idx) => (
            <motion.li 
              key={idx} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 group"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className={`w-5 h-5 rounded-full bg-${colors.light} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <FiCheck className={`text-${colors.primary}-600 text-xs`} />
                </div>
              </div>
              <span className="flex-1">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={onPurchase}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full rounded-xl py-3.5 text-center font-semibold text-sm transition-all duration-200 overflow-hidden group ${
          isRecommended
            ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg shadow-${colors.primary}-600/20 hover:shadow-xl hover:shadow-${colors.primary}-600/30`
            : `border-2 border-slate-200 bg-white text-slate-700 hover:border-${colors.primary}-600 hover:text-${colors.primary}-600`
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isHovered ? (
            <>
              <FiCreditCard className="text-base" />
              <span>Choose Plan</span>
              <FiArrowRight className="text-base transition-transform group-hover:translate-x-1" />
            </>
          ) : (
            <>
              <FiZap className="text-base" />
              <span>Get Started</span>
            </>
          )}
        </span>
        
        {/* Animated background on hover */}
        {!isRecommended && (
          <motion.div 
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10`}
          />
        )}
      </motion.button>

      {/* Additional subtle details */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
          <FiShield className="text-xs" />
          30-day money-back guarantee
        </p>
      </div>
    </motion.div>
  );
};

export default PlanCard;

