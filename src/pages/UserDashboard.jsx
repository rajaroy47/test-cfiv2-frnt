import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getProfile } from "../api/auth/authApi";
import { getAllPayments } from "../api/user/paymentApi";
import { getServiceStatus } from "../api/user/serviceApi";
import { toast } from "react-hot-toast";

// Icons
import { 
  FiUser, 
  FiPhone, 
  FiCheckCircle, 
  FiXCircle, 
  FiShield, 
  FiMail, 
  FiMapPin, 
  FiCreditCard,
  FiClock,
  FiRefreshCw,
  FiTrendingUp,
  FiCalendar,
  FiEdit2,
  FiHash,
  FiHome,
  FiArrowRight,
  FiAlertCircle,
  FiActivity,
  FiDollarSign,
  FiPackage,
  FiEye,
  FiBell,
  FiDownload,
  FiPrinter,
  FiShare2,
  FiBarChart2,
  FiTarget,
  FiAward,
  FiThumbsUp,
  FiMessageCircle,
  FiHelpCircle,
  FiSettings
} from "react-icons/fi";
import { 
  HiOutlineUserGroup, 
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlineChartPie,
  HiOutlineSupport 
} from "react-icons/hi";
import { 
  MdVerified, 
  MdBlock, 
  MdPayment,
  MdOutlineSubscriptions,
  MdAnalytics,
  MdOutlineEmail 
} from "react-icons/md";
import { FaRegCreditCard, FaRegIdCard, FaRegChartBar } from "react-icons/fa";

// Constants
const STATUS_CONFIG = {
  processing: { 
    class: "bg-amber-100 text-amber-700 border-amber-200", 
    label: "Processing",
    icon: FiClock,
    gradient: "from-amber-500 to-orange-500"
  },
  completed: { 
    class: "bg-green-100 text-green-700 border-green-200", 
    label: "Completed",
    icon: FiCheckCircle,
    gradient: "from-green-500 to-emerald-500"
  },
  failed: { 
    class: "bg-red-100 text-red-700 border-red-200", 
    label: "Failed",
    icon: FiXCircle,
    gradient: "from-red-500 to-rose-500"
  },
  pending: { 
    class: "bg-yellow-100 text-yellow-700 border-yellow-200", 
    label: "Pending",
    icon: FiActivity,
    gradient: "from-yellow-500 to-amber-500"
  },
  default: { 
    class: "bg-slate-100 text-slate-700 border-slate-200", 
    label: "Unknown",
    icon: FiAlertCircle,
    gradient: "from-slate-500 to-slate-600"
  }
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="rounded-2xl bg-white p-6 shadow-sm animate-pulse">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-6 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-slate-100 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Error State Component
const ErrorState = ({ message, onRetry }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6"
  >
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
        <FiAlertCircle className="text-red-500 text-4xl" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">Something went wrong</h3>
      <p className="text-slate-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <FiRefreshCw className="animate-spin" />
          Try Again
        </button>
      )}
    </div>
  </motion.div>
);

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <FiTrendingUp className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${color}`}>
          {Icon}
        </div>
      </div>
    </div>
  </motion.div>
);

// Info Row Component
const InfoRow = ({ label, value, icon: Icon, copyable = false }) => {
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      toast.success(`${label} copied to clipboard`);
    }
  };

  return (
    <div className="group space-y-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-slate-400 text-sm group-hover:text-blue-500 transition-colors" />}
        <p className="text-sm font-medium text-slate-500">{label}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-semibold text-slate-900 break-words">{value || "N/A"}</p>
        {copyable && value && (
          <button onClick={handleCopy} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <FiShare2 className="text-slate-400 hover:text-blue-500 text-xs" />
          </button>
        )}
      </div>
    </div>
  );
};

// Payment Card Component
const PaymentCard = ({ payment, onCheckStatus, isLoading, status }) => {
  const serviceId = payment.service?._id;
  const StatusIcon = STATUS_CONFIG[status?.toLowerCase()]?.icon || STATUS_CONFIG.default.icon;
  const statusGradient = STATUS_CONFIG[status?.toLowerCase()]?.gradient || STATUS_CONFIG.default.gradient;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
              <MdOutlineSubscriptions className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">
                {payment.service?.name || "Service Name"}
              </h3>
              <p className="text-xs text-slate-400">Order #{payment.order?.orderId?.slice(-8) || 'N/A'}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-600">
              ₹{payment.amount?.toLocaleString() || 0}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <InfoRow label="Plan Name" value={payment.order?.plan || "N/A"} />
          <div>
            <p className="text-slate-500 text-sm">Payment Status</p>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold uppercase mt-1 ${
              payment.paymentStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {payment.paymentStatus === 'success' ? <FiCheckCircle className="text-xs" /> : <FiXCircle className="text-xs" />}
              {payment.paymentStatus}
            </span>
          </div>
          <InfoRow label="Payment Method" value={payment.paymentMethod || "N/A"} icon={FaRegCreditCard} />
          <InfoRow label="Payment Date" value={
            payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            }) : "N/A"
          } icon={FiCalendar} />
        </div>
        
        {payment.razorpayPaymentId && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <FiHash className="text-xs" />
              Transaction ID
            </p>
            <p className="font-mono text-xs text-slate-600 break-all mt-1">{payment.razorpayPaymentId}</p>
          </div>
        )}
      </div>
      
      {serviceId && (
        <div className="p-5 bg-gradient-to-r from-slate-50 to-white border-t border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <FiActivity className="text-xs" />
                Service Status
              </p>
              {status ? (
                <div className="flex items-center gap-2 mt-1">
                  <div className={`p-1 rounded-full bg-gradient-to-r ${statusGradient}`}>
                    <StatusIcon className="text-white text-xs" />
                  </div>
                  <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_CONFIG[status.toLowerCase()]?.class || STATUS_CONFIG.default.class}`}>
                    {STATUS_CONFIG[status.toLowerCase()]?.label || status}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-slate-500 mt-1">Not checked</p>
              )}
            </div>
            <button
              onClick={() => onCheckStatus(serviceId)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-sm font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <FiRefreshCw className="animate-spin text-sm" />
                  Checking...
                </>
              ) : (
                <>
                  <FiEye className="text-sm" />
                  Track Status
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    { icon: FiSettings, label: "Settings", link: "/settings", color: "from-blue-500 to-indigo-500" },
    { icon: FiHelpCircle, label: "Support", link: "/support", color: "from-purple-500 to-pink-500" },
    { icon: FiMessageCircle, label: "Feedback", link: "/feedback", color: "from-green-500 to-emerald-500" },
    { icon: FiDownload, label: "Reports", link: "/reports", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action, idx) => (
        <Link key={idx} to={action.link}>
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="p-4 bg-white rounded-xl border border-slate-200 text-center hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}>
              <action.icon className="text-white text-lg" />
            </div>
            <p className="text-sm font-medium text-slate-700">{action.label}</p>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

// Main Dashboard Component
function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusLoadingMap, setStatusLoadingMap] = useState({});
  const [serviceStatusMap, setServiceStatusMap] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [profileResult, paymentsResult] = await Promise.allSettled([
        getProfile(),
        getAllPayments(),
      ]);

      if (profileResult.status === "fulfilled") {
        setProfile(profileResult.value?.user || null);
      } else {
        console.error("Profile fetch failed:", profileResult.reason);
        setError("Failed to load profile information");
        toast.error("Failed to load profile information");
      }

      if (paymentsResult.status === "fulfilled") {
        setPayments(paymentsResult.value?.payments || []);
      } else {
        console.error("Payments fetch failed:", paymentsResult.reason);
        toast.error("Failed to load payment history");
      }
    } catch (error) {
      console.error("Critical error loading dashboard:", error);
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
    
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, [loadDashboardData]);

  const handleCheckStatus = useCallback(async (serviceId) => {
    if (!serviceId) return;

    setStatusLoadingMap((prev) => ({ ...prev, [serviceId]: true }));

    try {
      const response = await getServiceStatus(serviceId);
      
      if (response?.success && response?.data?.status) {
        setServiceStatusMap((prev) => ({
          ...prev,
          [serviceId]: response.data.status,
        }));
        toast.success(`Status updated: ${response.data.status}`);
      } else {
        console.warn("Unexpected status response format:", response);
        toast.error("Failed to fetch service status");
      }
    } catch (error) {
      console.error("Failed to fetch service status:", error);
      toast.error("Error checking status. Please try again.");
    } finally {
      setStatusLoadingMap((prev) => ({ ...prev, [serviceId]: false }));
    }
  }, []);

  const stats = useMemo(() => [
    {
      title: "Total Spent",
      value: `₹${payments.reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}`,
      icon: <FiDollarSign className="text-2xl" />,
      color: "bg-green-100 text-green-600",
      trend: 12.5
    },
    {
      title: "Active Services",
      value: payments.filter(p => p.paymentStatus === 'success').length.toString(),
      icon: <FiPackage className="text-2xl" />,
      color: "bg-blue-100 text-blue-600",
      trend: 5.2
    },
    {
      title: "Verification Status",
      value: profile?.isVerified ? "Verified" : "Pending",
      icon: profile?.isVerified ? <MdVerified className="text-2xl" /> : <FiAlertCircle className="text-2xl" />,
      color: profile?.isVerified ? "bg-purple-100 text-purple-600" : "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Account Status",
      value: profile?.isBlocked ? "Blocked" : "Active",
      icon: profile?.isBlocked ? <MdBlock className="text-2xl" /> : <FiShield className="text-2xl" />,
      color: profile?.isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600",
    },
  ], [payments, profile]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !profile) {
    return <ErrorState message={error || "Failed to load profile data"} onRetry={loadDashboardData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">
      {/* Welcome Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <FiCheckCircle className="text-green-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Welcome back!</h4>
                <p className="text-sm text-slate-600">Good to see you again, {profile.fullName.split(' ')[0]}</p>
              </div>
              <button 
                onClick={() => setShowNotification(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiXCircle className="text-lg" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Profile Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full -mr-48 -mt-48" />
          
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <img
                  src={profile.avatar || `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(profile.fullName)}&size=120&bold=true`}
                  alt={profile.fullName}
                  className="relative h-28 w-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {profile.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-1 border-2 border-white shadow-md">
                    <MdVerified className="text-white text-sm" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                  Welcome back, {profile.fullName.split(' ')[0]}
                  {profile.isVerified && <MdVerified className="text-blue-400 text-2xl" />}
                </h1>
                <p className="mt-1 text-slate-300 flex items-center gap-1 justify-center md:justify-start">
                  <MdOutlineEmail className="text-sm" />
                  {profile.email}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white uppercase tracking-wide flex items-center gap-1">
                    <HiOutlineUserGroup className="text-xs" />
                    {profile.role}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 backdrop-blur-sm ${
                    profile.isVerified
                      ? "bg-green-500/20 text-green-100"
                      : "bg-yellow-500/20 text-yellow-100"
                  }`}>
                    {profile.isVerified ? <MdVerified className="text-sm" /> : <FiAlertCircle className="text-sm" />}
                    {profile.isVerified ? "Verified Account" : "Verification Pending"}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={loadDashboardData}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
                title="Refresh Dashboard"
              >
                <FiRefreshCw className="text-xl" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Enhanced */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <Link to="/settings" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <FiArrowRight className="text-xs" />
            </Link>
          </div>
          <QuickActions />
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
        >
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiUser className="text-blue-600 text-xl" />
                <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
              </div>
              <Link to="/settings" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <FiEdit2 className="text-xs" />
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <InfoRow label="Full Name" value={profile.fullName} icon={FiUser} />
              <InfoRow label="Email Address" value={profile.email} icon={FiMail} copyable />
              <InfoRow label="Phone Number" value={profile.userDetails?.identity?.phone} icon={FiPhone} copyable />
              <InfoRow label="PAN Card" value={profile.userDetails?.identity?.panCard} icon={FaRegIdCard} />
              <InfoRow label="Aadhaar Card" value={profile.userDetails?.identity?.aadhaarCard} icon={HiOutlineIdentification} />
              <InfoRow label="Account Status" value={profile.isBlocked ? "Blocked" : "Active"} icon={FiShield} />
            </div>
          </div>
        </motion.div>

        {/* Address Information */}
        {profile.userDetails?.address && Object.keys(profile.userDetails.address).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-blue-600 text-xl" />
                <h2 className="text-xl font-bold text-slate-900">Address Details</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <InfoRow label="Street Address" value={profile.userDetails.address.streetAddress} icon={HiOutlineLocationMarker} />
                <InfoRow label="City" value={profile.userDetails.address.city} icon={FiHome} />
                <InfoRow label="State" value={profile.userDetails.address.state} />
                <InfoRow label="Country" value={profile.userDetails.address.country} />
                <InfoRow label="Postal Code" value={profile.userDetails.address.postalCode} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <MdPayment className="text-blue-600 text-xl" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Payments & Subscriptions</h2>
                  <p className="text-sm text-slate-500 mt-1">Manage your service subscriptions and track their status</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <FiTrendingUp />
                  <span>Total: ₹{payments.reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}</span>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Download Report">
                  <FiDownload className="text-slate-500" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Print">
                  <FiPrinter className="text-slate-500" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {payments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {payments.map((payment, index) => (
                  <PaymentCard
                    key={payment.razorpayPaymentId || payment._id || index}
                    payment={payment}
                    onCheckStatus={handleCheckStatus}
                    isLoading={statusLoadingMap[payment.service?._id]}
                    status={serviceStatusMap[payment.service?._id]}
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <FiCreditCard className="text-slate-400 text-3xl" />
                </div>
                <p className="text-slate-500 text-lg">No payment history found</p>
                <p className="text-slate-400 text-sm mt-2">Your transactions will appear here</p>
                <Link to="/services" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Browse Services
                  <FiArrowRight />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Account Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
            <div className="flex items-center gap-2">
              <FiBell className="text-blue-600 text-xl" />
              <h2 className="text-xl font-bold text-slate-900">Account Information</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <InfoRow label="User ID" value={profile._id} icon={FiHash} copyable />
              <InfoRow label="Member Since" value={new Date(profile.createdAt).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} icon={FiCalendar} />
              <InfoRow label="Last Updated" value={new Date(profile.updatedAt).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} icon={FiClock} />
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <HiOutlineSupport className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Need Help?</h3>
                <p className="text-blue-100 text-sm">Our support team is here to assist you 24/7</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white text-blue-600 rounded-xl font-medium hover:shadow-lg transition-all">
                Contact Support
              </button>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-all">
                View FAQ
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserDashboard;