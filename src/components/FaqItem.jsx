import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiChevronDown, 
  FiHelpCircle, 
  FiBookOpen, 
  FiThumbsUp,
  FiLink,
  FiMail,
  FiMessageCircle
} from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";

const FaqItem = ({ faq, index = 0, category = "general", onHelpfulClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const contentRef = useRef(null);

  // Destructure FAQ data with safe fallbacks
  const {
    question = "Frequently Asked Question",
    answer = "Answer not available",
    helpful = 0,
    relatedLinks = [],
    tags = []
  } = faq || {};

  // Auto-close feedback message after 3 seconds
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const handleHelpfulClick = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setShowFeedback(true);
      if (onHelpfulClick) {
        onHelpfulClick(faq.id);
      }
    }
  };

  // Category icon mapping
  const getCategoryIcon = () => {
    switch(category.toLowerCase()) {
      case 'billing':
        return FiBookOpen;
      case 'technical':
        return FiHelpCircle;
      case 'general':
      default:
        return HiOutlineLightBulb;
    }
  };

  const CategoryIcon = getCategoryIcon();

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut",
        opacity: { duration: 0.2 }
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.2, 
        ease: "easeInOut",
        opacity: { duration: 0.1 }
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    open: { rotate: 180, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
        isOpen 
          ? "border-blue-600 shadow-xl shadow-blue-600/10 bg-gradient-to-br from-slate-50 to-white" 
          : "border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
      }`}
    >
      {/* Accordion Toggle Button */}
      <button
        className="w-full flex justify-between items-center p-5 lg:p-6 bg-transparent border-none text-left font-semibold text-slate-900 group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Toggle answer for ${question}`}
      >
        <div className="flex items-start gap-3 flex-1">
          {/* Category Icon */}
          <div className={`hidden sm:flex w-8 h-8 rounded-full items-center justify-center shrink-0 transition-all duration-200 ${
            isOpen 
              ? "bg-blue-100 text-blue-600" 
              : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
          }`}>
            <CategoryIcon className="text-base" />
          </div>
          
          {/* Question Text */}
          <div className="flex-1">
            <span className={`text-base sm:text-lg font-semibold leading-relaxed transition-colors duration-200 ${
              isOpen ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
            }`}>
              {question}
            </span>
            
            {/* Tags Row */}
            {tags && tags.length > 0 && !isOpen && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Chevron Icon with Animation */}
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate={isOpen ? "open" : "initial"}
          className={`ml-4 shrink-0`}
        >
          <FiChevronDown className={`w-5 h-5 transition-all duration-200 ${
            isOpen 
              ? "text-blue-600" 
              : "text-slate-400 group-hover:text-slate-600"
          }`} />
        </motion.div>
      </button>

      {/* Answer Content with AnimatePresence */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 lg:px-6 lg:pb-6 pt-2 border-t border-slate-100">
              {/* Answer Text */}
              <div className="text-sm sm:text-base leading-relaxed text-slate-600 mb-4">
                <p className="whitespace-pre-wrap">{answer}</p>
              </div>

              {/* Helpful Section */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Was this helpful?</span>
                  <button
                    onClick={handleHelpfulClick}
                    disabled={isHelpful}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      isHelpful
                        ? "bg-green-100 text-green-700 cursor-default"
                        : "bg-slate-100 text-slate-600 hover:bg-green-100 hover:text-green-700 hover:scale-105"
                    }`}
                  >
                    <FiThumbsUp className="text-xs" />
                    <span>Yes</span>
                    {helpful > 0 && <span className="text-xs">({helpful})</span>}
                  </button>
                </div>

                {/* Related Links */}
                {relatedLinks && relatedLinks.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <FiLink className="text-xs text-slate-400" />
                    {relatedLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline transition-all"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Feedback Toast Message */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                  >
                    <FiThumbsUp className="text-green-600 text-sm" />
                    <p className="text-xs text-green-700">Thanks for your feedback!</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Support Option */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <FiMessageCircle className="text-xs" />
                  Still need help?
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-all hover:gap-2">
                  <FiMail className="text-xs" />
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqItem;