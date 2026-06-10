import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram, 
  FiYoutube,
  FiArrowUpRight,
  FiHeart,
  FiShield,
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiAward,
  FiHome,
  FiInfo,
  FiHelpCircle,
  FiSend,
  FiTrendingUp,
  FiGlobe,
  FiStar,
  FiChevronUp,
  FiMessageCircle,
  FiUsers,
  FiDollarSign,
  FiLock
} from "react-icons/fi";
import { 
  FaWhatsapp, 
  FaBuilding,
  FaRegCreditCard,
  FaApplePay,
  FaGooglePay,
  FaAmazonPay
} from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiRazorpay } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);
  const newsletterRef = useRef(null);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowNewsletterSuccess(true);
      setEmail("");
      setTimeout(() => setShowNewsletterSuccess(false), 3000);
    }, 1000);
  };

  // Social links configuration
  const socialLinks = [
    { icon: FiFacebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-[#1877f2]" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-[#1da1f2]" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-[#0a66c2]" },
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-gradient-to-tr from-[#f09433] to-[#bc1888]" },
    { icon: FaWhatsapp, href: "https://wa.me/919876543210", label: "WhatsApp", color: "hover:bg-[#25d366]" },
    { icon: FiYoutube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-[#ff0000]" },
  ];

  // Quick links
  const quickLinks = [
    { name: "Home", path: "/", icon: FiHome, description: "Back to homepage" },
    { name: "Services", path: "/services", icon: FiBriefcase, description: "Explore our services" },
    { name: "About Us", path: "/about", icon: FiInfo, description: "Learn about us" },
    { name: "Contact", path: "/contact", icon: FiMail, description: "Get in touch" },
    { name: "FAQ", path: "/faq", icon: FiHelpCircle, description: "Common questions" },
  ];

  // Popular services with descriptions
  const popularServices = [
    { name: "GST Registration", icon: FiFileText, popular: true, path: "/services/gst-registration", description: "Simplify your tax compliance" },
    { name: "FSSAI License", icon: FiCheckCircle, popular: false, path: "/services/fssai-license", description: "Food business certification" },
    { name: "MSME Registration", icon: FiAward, popular: true, path: "/services/msme-registration", description: "Boost your business benefits" },
    { name: "Trademark Registration", icon: FiShield, popular: false, path: "/services/trademark-registration", description: "Protect your brand" },
    { name: "Private Limited Company", icon: FaBuilding, popular: true, path: "/services/private-limited-company", description: "Start your venture" },
  ];

  // Legal links
  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "Cancellation Policy", path: "/cancellation-policy" },
    { name: "Cookie Policy", path: "/cookie-policy" },
  ];

  // Payment methods
  const paymentMethods = [
    { name: "Visa", icon: SiVisa },
    { name: "Mastercard", icon: SiMastercard },
    { name: "Razorpay", icon: SiRazorpay },
    { name: "PayPal", icon: SiPaypal },
    { name: "Google Pay", icon: FaGooglePay },
    { name: "Apple Pay", icon: FaApplePay },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-t border-slate-200">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto w-[90%] max-w-7xl py-12 lg:py-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Brand Section - Enhanced */}
            <motion.div variants={itemVariants} className="space-y-4">
              <Link to="/" className="inline-block group">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                      CFI<span className="text-blue-600">V2.0</span>
                    </h2>
                    <p className="text-xs text-slate-400 -mt-1">Your Trusted Partner</p>
                  </div>
                </div>
              </Link>
              
              <p className="text-sm leading-relaxed text-slate-600">
                Simplifying business registrations, compliance, taxation, licensing and legal services for startups, entrepreneurs and growing companies.
              </p>
              
              {/* Trust Badge - Enhanced */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-white flex items-center justify-center shadow-sm"
                    >
                      <FiCheckCircle className="text-blue-600 text-xs" />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-700">10,000+</span>
                  <p className="text-xs text-slate-500">Trusted Clients</p>
                </div>
              </div>

              {/* Social Links - Enhanced */}
              <div className="flex flex-wrap items-center gap-2 pt-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-sm" />
                  </motion.a>
                ))}
              </div>

              {/* Live Chat Status */}
              <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live support available</span>
              </div>
            </motion.div>

            {/* Quick Links Section - Enhanced */}
            <motion.div variants={itemVariants}>
              <h3 className="mb-5 text-lg font-bold text-slate-900 relative inline-block">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-all duration-200"
                      title={link.description}
                    >
                      <link.icon className="text-xs opacity-0 group-hover:opacity-100 transition-all" />
                      <span>{link.name}</span>
                      <FiArrowUpRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Achievement Badge */}
              <div className="mt-6 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2">
                  <FiStar className="text-amber-500" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700">Rated 4.9/5</p>
                    <p className="text-xs text-amber-600">by 5000+ customers</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Popular Services Section - Enhanced */}
            <motion.div variants={itemVariants}>
              <h3 className="mb-5 text-lg font-bold text-slate-900 relative inline-block">
                Popular Services
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {popularServices.map((service, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={service.path}
                      className="group flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
                      title={service.description}
                    >
                      <div className="flex items-center gap-2">
                        <service.icon className="text-xs text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span>{service.name}</span>
                      </div>
                      {service.popular && (
                        <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-2 py-0.5 rounded-full shadow-sm">
                          🔥 Popular
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* View All Services Link */}
              <Link 
                to="/services" 
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
              >
                View all services
                <FiTrendingUp className="text-xs group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Contact Section - Enhanced */}
            <motion.div variants={itemVariants}>
              <h3 className="mb-5 text-lg font-bold text-slate-900 relative inline-block">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm text-slate-600 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-all">
                    <FiMail className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email us</p>
                    <a href="mailto:support@cfiv2.com" className="hover:text-blue-600 transition-colors font-medium">
                      support@cfiv2.com
                    </a>
                  </div>
                </motion.li>
                
                <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm text-slate-600 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center group-hover:scale-110 transition-all">
                    <FiPhone className="text-green-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Call us</p>
                    <a href="tel:+919876543210" className="hover:text-green-600 transition-colors font-medium">
                      +91 98765 43210
                    </a>
                  </div>
                </motion.li>
                
                <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm text-slate-600 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-all">
                    <FiMapPin className="text-purple-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Visit us</p>
                    <span className="font-medium">Kolkata, West Bengal, India</span>
                  </div>
                </motion.li>
                
                <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm text-slate-600 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-all">
                    <FiClock className="text-amber-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Working hours</p>
                    <span className="font-medium">Mon - Sat : 9:00 AM - 7:00 PM</span>
                    <p className="text-xs text-slate-400 mt-0.5">Sunday Closed</p>
                  </div>
                </motion.li>
              </ul>

              {/* Newsletter Signup - Enhanced */}
              <div className="mt-6 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <FiSend className="text-blue-600 text-sm" />
                  <p className="text-xs font-semibold text-slate-700">Subscribe to our newsletter</p>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="w-full px-4 py-2.5 pr-24 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-1 top-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? "..." : "Subscribe"}
                  </button>
                </form>
                
                {/* Success Message */}
                <AnimatePresence>
                  {showNewsletterSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 p-2 bg-green-50 rounded-lg text-xs text-green-600 text-center"
                    >
                      ✓ Subscribed successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <FiLock className="text-xs" />
                  No spam, unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Bar - Enhanced */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-slate-200"
          >
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-500">
                <span>© {currentYear} CFI V2.0.</span>
                <span className="hidden sm:inline">•</span>
                <span>All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with <FiHeart className="text-red-500 text-xs animate-pulse" /> in India
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {legalLinks.map((link, idx) => (
                  <React.Fragment key={idx}>
                    <Link
                      to={link.path}
                      className="text-xs text-slate-500 hover:text-blue-600 transition-colors hover:underline"
                    >
                      {link.name}
                    </Link>
                    {idx < legalLinks.length - 1 && (
                      <span className="text-slate-300 text-xs">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Payment Methods - Enhanced */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <FiShield className="text-xs" />
                Secure Payments:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {paymentMethods.map((method, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <method.icon className="text-slate-600 text-sm" />
                    <span className="text-xs font-medium text-slate-600">{method.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <FiShield /> 256-bit SSL Secure
              </span>
              <span className="flex items-center gap-1">
                <FiUsers /> PCI DSS Compliant
              </span>
              <span className="flex items-center gap-1">
                <FiGlobe /> Global Standards
              </span>
            </div>
          </motion.div>
        </div>

        {/* Floating WhatsApp Button - Enhanced */}
        <motion.a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 group"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform" />
          <span className="absolute -top-10 right-0 bg-slate-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us
          </span>
        </motion.a>

        {/* Scroll to Top Button - Enhanced */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ y: -5 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-24 z-50 w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 group"
              aria-label="Scroll to top"
            >
              <FiChevronUp className="text-lg group-hover:scale-110 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { transform: translateX(0%); }
          50% { transform: translateX(100%); }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </>
  );
};

export default Footer;