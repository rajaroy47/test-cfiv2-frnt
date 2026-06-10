// ServiceDetails.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getServiceBySlug, getServicePlans } from "../api/public/serviceApi";
import {
  processPayment,
  getRazorpayKey,
  verifyPayment,
} from "../api/user/paymentApi";
import { useAuth } from "../context/AuthContext";

import PlanCard from "../components/PlanCard";
import FaqItem from "../components/FaqItem";

// Icons
import { 
  FiCheckCircle, 
  FiClock, 
  FiArrowRight, 
  FiFileText, 
  FiShoppingCart,
  FiInfo,
  FiTrendingUp,
  FiShield,
  FiAward,
  FiMail,
  FiMessageCircle,
  FiStar,
  FiUsers,
  FiThumbsUp
} from "react-icons/fi";
import { HiOutlineLightBulb, HiOutlineSparkles } from "react-icons/hi";
import { FaRegCreditCard, FaWhatsapp } from "react-icons/fa";

const ServiceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeImage, setActiveImage] = useState('main');
  
  const plansSectionRef = useRef(null);

  useEffect(() => {
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    try {
      setLoading(true);
      setError(null);
      const serviceData = await getServiceBySlug(slug);
      setService(serviceData);

      // Fetch dynamic layered plan configurations
      const planData = await getServicePlans(serviceData._id);
      setPlans(planData.data);
    } catch (error) {
      console.error("Error loading service:", error);
      setError(error.response?.data?.message || "Failed to load service details");
    } finally {
      setLoading(false);
    }
  };

  const scrollToPlans = () => {
    plansSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePurchase = async (planName, planData) => {
    if (!user) {
      // Store intended purchase in session storage for redirect back
      sessionStorage.setItem('intendedPurchase', JSON.stringify({ 
        serviceId: service._id, 
        planName,
        serviceName: service.name 
      }));
      navigate("/login", { state: { from: `/service/${slug}` } });
      return;
    }

    setIsProcessing(true);
    setSelectedPlan(planName);

    try {
      const keyResponse = await getRazorpayKey();
      const orderResponse = await processPayment(service._id, planName);

      const options = {
        key: keyResponse.key,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        order_id: orderResponse.orderId,
        name: service.name,
        description: `${planName.toUpperCase()} Plan Registration`,
        image: service.serviceImage || "/logo.png",
        handler: async (response) => {
          try {
            await verifyPayment(response);
            navigate("/success", { 
              state: { 
                serviceName: service.name, 
                planName: planName,
                amount: orderResponse.amount / 100
              } 
            });
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: user.userDetails?.identity?.phone || ""
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setSelectedPlan(null);
          }
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert(error.response?.data?.message || "Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  // Loading State with Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 md:py-16">
        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 mb-16 md:mb-24">
            <div className="space-y-6">
              <div className="h-8 w-32 bg-slate-200 rounded-full animate-pulse" />
              <div className="h-12 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="flex gap-4">
                <div className="h-14 w-32 bg-slate-200 rounded-xl animate-pulse" />
                <div className="h-14 w-40 bg-slate-200 rounded-xl animate-pulse" />
              </div>
            </div>
            <div className="h-[400px] bg-slate-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Service Not Found</h2>
          <p className="text-slate-500 mb-6">
            {error || "The service you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all"
            >
              Browse Services
              <FiArrowRight />
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
        <div className="mx-auto w-[90%] max-w-7xl py-10 md:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start text-left"
            >
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700">
                  <HiOutlineSparkles className="text-sm" />
                  {service.serviceCategory || "Premium Service"}
                </span>
                {service.isPopular && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700">
                    <FiStar className="text-sm" />
                    Most Popular
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-4 leading-tight">
                {service.name}
              </h1>
              
              <p className="text-base sm:text-lg leading-relaxed text-slate-500 mb-6 max-w-xl">
                {service.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {service.rating && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <FiStar className="text-amber-400 fill-current" />
                    <span className="font-semibold">{service.rating}</span>
                    <span className="text-sm text-slate-400">({service.reviews}+ reviews)</span>
                  </div>
                )}
                {service.usersServed && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <FiUsers className="text-blue-500" />
                    <span className="text-sm">{service.usersServed}+ served</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
                  onClick={scrollToPlans}
                >
                  <FiShoppingCart className="text-lg" />
                  See Pricing
                </motion.button>
                
                {service.estimateDays && (
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-4 text-base font-medium text-slate-700 shadow-sm">
                    <FiClock className="text-blue-500" />
                    Est. {service.estimateDays} Days
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={service.serviceImage}
                alt={service.name}
                className="relative w-full max-h-[450px] object-cover rounded-2xl shadow-2xl shadow-slate-300/50 group-hover:shadow-3xl transition-all duration-300"
              />
              
              {/* Floating Badge */}
              {service.guarantee && (
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                  <FiShield className="text-green-500 text-xl" />
                  <div>
                    <p className="text-xs text-slate-500">Money-back</p>
                    <p className="font-bold text-sm text-slate-900">{service.guarantee}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mx-auto w-[90%] max-w-7xl py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-100 rounded-xl">
              <FiInfo className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              About This Service
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-[350px_1fr] lg:gap-12">
            {/* Side Images Carousel */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={activeImage === 'main' ? service.serviceImage : service.sideImage}
                  alt={service.name}
                  className="w-full h-64 object-cover transition-all duration-300"
                />
              </div>
              {(service.sideImage || service.thumbnailImage) && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveImage('main')}
                    className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === 'main' ? 'border-blue-600 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={service.serviceImage} alt="Main" className="h-16 w-full object-cover" />
                  </button>
                  {service.sideImage && (
                    <button
                      onClick={() => setActiveImage('side')}
                      className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === 'side' ? 'border-blue-600 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={service.sideImage} alt="Side" className="h-16 w-full object-cover" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Description and Documents */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-base leading-relaxed text-slate-600 whitespace-pre-line">
                  {service.longDescription}
                </p>
              </div>

              {/* Key Highlights */}
              {service.highlights && service.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <FiCheckCircle className="text-green-500 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Required Documents */}
              {service.requiredDocs && service.requiredDocs.length > 0 && (
                <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FiFileText className="text-blue-600" />
                    Required Documents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.requiredDocs.map((doc, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <FiCheckCircle className="text-emerald-600 text-xs" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {doc}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Plans Section */}
      <div ref={plansSectionRef} className="mx-auto w-[90%] max-w-7xl pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <FiTrendingUp className="text-blue-600 text-xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-3">
            Choose Your Perfect Plan
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Select the plan that best fits your needs. All plans include expert support and guaranteed delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans?.plans?.basic && (
            <PlanCard
              title="Basic"
              plan={plans.plans.basic}
              onPurchase={() => handlePurchase("basic", plans.plans.basic)}
              isProcessing={isProcessing && selectedPlan === "basic"}
            />
          )}
          {plans?.plans?.standard && (
            <PlanCard
              title="Standard"
              plan={plans.plans.standard}
              onPurchase={() => handlePurchase("standard", plans.plans.standard)}
              isProcessing={isProcessing && selectedPlan === "standard"}
            />
          )}
          {plans?.plans?.premium && (
            <PlanCard
              title="Premium"
              plan={plans.plans.premium}
              onPurchase={() => handlePurchase("premium", plans.plans.premium)}
              isProcessing={isProcessing && selectedPlan === "premium"}
            />
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FiShield className="text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FiAward className="text-blue-500" />
            <span>Expert Assistance</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FiClock className="text-amber-500" />
            <span>Timely Delivery</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {service?.faq?.length > 0 && (
        <div className="bg-white border-t border-slate-200 py-16 md:py-24">
          <div className="mx-auto w-[90%] max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <HiOutlineLightBulb className="text-purple-600 text-xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
                Find answers to common questions about our services and process
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl flex flex-col gap-4">
              {service.faq.map((faq, idx) => (
                <FaqItem key={faq._id} faq={faq} index={idx} />
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="mt-10 text-center">
              <p className="text-slate-600 mb-4">Still have questions?</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
                >
                  <FiMail />
                  Contact Support
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-all"
                >
                  <FaWhatsapp />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Banner */}
      <div className="mx-auto w-[90%] max-w-7xl py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-12 text-center text-white shadow-2xl shadow-blue-600/20 md:py-16 md:px-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base text-blue-100 sm:text-lg">
              Join thousands of satisfied customers who trusted us with their service needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-blue-600 shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all"
                onClick={scrollToPlans}
              >
                <FaRegCreditCard className="text-lg" />
                View Plans
                <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-7 py-4 text-base font-semibold text-white border border-white/30 hover:bg-white/30 transition-all"
                onClick={() => window.location.href = "/contact"}
              >
                <FiMessageCircle className="text-lg" />
                Talk to Expert
              </motion.button>
            </div>
            <p className="mt-6 text-xs text-blue-200">
              ✓ No hidden fees ✓ 100% satisfaction guaranteed ✓ Secure checkout
            </p>
          </div>
        </motion.div>
      </div>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4"
            >
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Processing Payment</h3>
              <p className="text-slate-500">Please don't close this window</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetails;