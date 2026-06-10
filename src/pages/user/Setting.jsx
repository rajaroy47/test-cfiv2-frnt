// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext';
// import { updateProfile, changePassword, updateAvatar } from '../../api/user/profileApi';
// import { toast } from 'react-hot-toast';

// // Icons
// import { 
//   FiUser, 
//   FiMail, 
//   FiPhone, 
//   FiLock, 
//   FiSave, 
//   FiCamera, 
//   FiShield, 
//   FiBell, 
//   FiGlobe, 
//   FiMonitor,
//   FiSmartphone,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiEye,
//   FiEyeOff,
//   FiLogOut,
//   FiTrash2,
//   FiEdit2,
//   FiPlus,
//   FiX,
//   FiCheck,
//   FiRefreshCw,
//   FiCreditCard,
//   FiActivity,
//   FiSettings as FiSettingsIcon,
//   FiKey,
//   FiUserCheck,
//   FiMapPin,
//   FiBriefcase,
//   FiCalendar,
//   FiClock
// } from 'react-icons/fi';
// import { 
//   FaGoogle, 
//   FaFacebook, 
//   FaGithub,
//   FaRegIdCard 
// } from 'react-icons/fa';
// import { MdVerified, MdSecurity } from 'react-icons/md';

// const Setting = () => {
//   const { user, updateUser, logout } = useAuth();
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  
//   // Profile Form State
//   const [profileForm, setProfileForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     bio: '',
//     company: '',
//     position: '',
//     location: '',
//     website: '',
//     socialLinks: {
//       twitter: '',
//       linkedin: '',
//       github: ''
//     }
//   });
  
//   // Password Form State
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
  
//   // Notification Settings
//   const [notificationSettings, setNotificationSettings] = useState({
//     emailNotifications: true,
//     pushNotifications: true,
//     smsNotifications: false,
//     marketingEmails: false,
//     serviceUpdates: true,
//     paymentAlerts: true
//   });
  
//   // Security Settings
//   const [securitySettings, setSecuritySettings] = useState({
//     twoFactorAuth: false,
//     loginAlerts: true,
//     deviceManagement: true,
//     sessionTimeout: '30'
//   });

//   // Load user data
//   useEffect(() => {
//     if (user) {
//       setProfileForm({
//         fullName: user.fullName || '',
//         email: user.email || '',
//         phone: user.userDetails?.identity?.phone || '',
//         bio: user.bio || '',
//         company: user.company || '',
//         position: user.position || '',
//         location: user.location || '',
//         website: user.website || '',
//         socialLinks: user.socialLinks || {
//           twitter: '',
//           linkedin: '',
//           github: ''
//         }
//       });
//     }
//   }, [user]);

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: FiUser, description: 'Manage your personal information' },
//     { id: 'security', label: 'Security', icon: FiShield, description: 'Password & security settings' },
//     { id: 'notifications', label: 'Notifications', icon: FiBell, description: 'Configure notification preferences' },
//     { id: 'preferences', label: 'Preferences', icon: FiSettingsIcon, description: 'Appearance & language settings' },
//     { id: 'billing', label: 'Billing', icon: FiCreditCard, description: 'Payment methods & invoices' }
//   ];

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await updateProfile(profileForm);
//       updateUser(profileForm);
//       toast.success('Profile updated successfully!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to update profile');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }
//     if (passwordForm.newPassword.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       await changePassword({
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword
//       });
//       toast.success('Password changed successfully!');
//       setPasswordForm({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//     } catch (error) {
//       toast.error(error.message || 'Failed to change password');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File size must be less than 5MB');
//       return;
//     }
    
//     const formData = new FormData();
//     formData.append('avatar', file);
    
//     setIsLoading(true);
//     try {
//       await updateAvatar(formData);
//       toast.success('Avatar updated successfully!');
//       window.location.reload();
//     } catch (error) {
//       toast.error('Failed to update avatar');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNotificationToggle = (key) => {
//     setNotificationSettings(prev => ({
//       ...prev,
//       [key]: !prev[key]
//     }));
//     toast.success(`${key} ${!notificationSettings[key] ? 'enabled' : 'disabled'}`);
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.3 } }
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Settings</h1>
//           <p className="text-slate-500 mt-2">Manage your account preferences and security settings</p>
//         </motion.div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:w-80 flex-shrink-0"
//           >
//             {/* Profile Summary Card */}
//             <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
//               <div className="text-center">
//                 <div className="relative inline-block">
//                   <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg">
//                     {user?.fullName?.charAt(0) || 'U'}
//                   </div>
//                   <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors border border-slate-200">
//                     <FiCamera className="text-slate-600 text-sm" />
//                     <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
//                   </label>
//                 </div>
//                 <h3 className="mt-4 font-semibold text-slate-900">{user?.fullName}</h3>
//                 <p className="text-sm text-slate-500">{user?.email}</p>
//                 {user?.isVerified && (
//                   <span className="inline-flex items-center gap-1 mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
//                     <MdVerified className="text-sm" />
//                     Verified Account
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Navigation Tabs */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 ${
//                       isActive
//                         ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 text-blue-700'
//                         : 'hover:bg-slate-50 text-slate-600'
//                     }`}
//                   >
//                     <Icon className={`text-lg ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
//                     <div className="text-left flex-1">
//                       <p className={`font-medium ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
//                         {tab.label}
//                       </p>
//                       <p className="text-xs text-slate-400 mt-0.5">{tab.description}</p>
//                     </div>
//                     {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Danger Zone */}
//             <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-200">
//               <div className="flex items-center gap-2 mb-3">
//                 <FiAlertCircle className="text-red-500" />
//                 <h4 className="font-semibold text-red-700">Danger Zone</h4>
//               </div>
//               <button
//                 onClick={() => {
//                   if (window.confirm('Are you sure you want to logout?')) {
//                     logout();
//                   }
//                 }}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
//               >
//                 <FiLogOut />
//                 Logout Account
//               </button>
//             </div>
//           </motion.div>

//           {/* Main Content */}
//           <motion.div
//             key={activeTab}
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="flex-1"
//           >
//             <AnimatePresence mode="wait">
//               {/* Profile Settings */}
//               {activeTab === 'profile' && (
//                 <motion.div
//                   key="profile"
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
//                 >
//                   <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                     <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
//                     <p className="text-sm text-slate-500 mt-1">Update your personal details and contact information</p>
//                   </div>
                  
//                   <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Full Name
//                         </label>
//                         <div className="relative">
//                           <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type="text"
//                             value={profileForm.fullName}
//                             onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
//                             className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                             required
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Email Address
//                         </label>
//                         <div className="relative">
//                           <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type="email"
//                             value={profileForm.email}
//                             onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
//                             className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                             required
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Phone Number
//                         </label>
//                         <div className="relative">
//                           <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type="tel"
//                             value={profileForm.phone}
//                             onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
//                             className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Location
//                         </label>
//                         <div className="relative">
//                           <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type="text"
//                             value={profileForm.location}
//                             onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
//                             className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                             placeholder="City, Country"
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Company
//                         </label>
//                         <div className="relative">
//                           <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type="text"
//                             value={profileForm.company}
//                             onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
//                             className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Position
//                         </label>
//                         <div className="relative">
//                           <FiUserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type="text"
//                             value={profileForm.position}
//                             onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
//                             className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Bio
//                       </label>
//                       <textarea
//                         value={profileForm.bio}
//                         onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
//                         rows="4"
//                         className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
//                         placeholder="Tell us about yourself..."
//                       />
//                     </div>
                    
//                     <div className="flex justify-end">
//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
//                       >
//                         {isLoading ? (
//                           <>
//                             <FiRefreshCw className="animate-spin" />
//                             Saving...
//                           </>
//                         ) : (
//                           <>
//                             <FiSave />
//                             Save Changes
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 </motion.div>
//               )}

//               {/* Security Settings */}
//               {activeTab === 'security' && (
//                 <motion.div
//                   key="security"
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="space-y-6"
//                 >
//                   {/* Change Password */}
//                   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                     <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                       <div className="flex items-center gap-2">
//                         <FiKey className="text-blue-600 text-xl" />
//                         <div>
//                           <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
//                           <p className="text-sm text-slate-500 mt-1">Update your password to keep your account secure</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <form onSubmit={handlePasswordChange} className="p-6 space-y-5">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Current Password
//                         </label>
//                         <div className="relative">
//                           <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type={showCurrentPassword ? "text" : "password"}
//                             value={passwordForm.currentPassword}
//                             onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
//                             className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                           >
//                             {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                           </button>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           New Password
//                         </label>
//                         <div className="relative">
//                           <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             value={passwordForm.newPassword}
//                             onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
//                             className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                           >
//                             {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                           </button>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Confirm New Password
//                         </label>
//                         <div className="relative">
//                           <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                           <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             value={passwordForm.confirmPassword}
//                             onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
//                             className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                           >
//                             {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                           </button>
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-end">
//                         <button
//                           type="submit"
//                           disabled={isLoading}
//                           className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
//                         >
//                           {isLoading ? (
//                             <>
//                               <FiRefreshCw className="animate-spin" />
//                               Updating...
//                             </>
//                           ) : (
//                             <>
//                               <FiSave />
//                               Update Password
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </form>
//                   </div>

//                   {/* Two-Factor Authentication */}
//                   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                     <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                       <div className="flex items-center gap-2">
//                         <MdSecurity className="text-blue-600 text-xl" />
//                         <div>
//                           <h2 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h2>
//                           <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="p-6">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-slate-900">Enable 2FA</p>
//                           <p className="text-sm text-slate-500">Protect your account with two-factor authentication</p>
//                         </div>
//                         <button
//                           onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
//                           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                             securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-slate-200'
//                           }`}
//                         >
//                           <span
//                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                               securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
//                             }`}
//                           />
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Session Management */}
//                   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                     <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                       <div className="flex items-center gap-2">
//                         <FiMonitor className="text-blue-600 text-xl" />
//                         <div>
//                           <h2 className="text-xl font-bold text-slate-900">Active Sessions</h2>
//                           <p className="text-sm text-slate-500 mt-1">Manage your active devices and sessions</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="p-6 space-y-4">
//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                         <div className="flex items-center gap-3">
//                           <FiMonitor className="text-slate-600 text-xl" />
//                           <div>
//                             <p className="font-medium text-slate-900">Chrome on Windows</p>
//                             <p className="text-xs text-slate-500">Kolkata, India • Last active now</p>
//                           </div>
//                         </div>
//                         <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Current session</span>
//                       </div>
                      
//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                         <div className="flex items-center gap-3">
//                           <FiSmartphone className="text-slate-600 text-xl" />
//                           <div>
//                             <p className="font-medium text-slate-900">Safari on iPhone</p>
//                             <p className="text-xs text-slate-500">Mumbai, India • 2 hours ago</p>
//                           </div>
//                         </div>
//                         <button className="text-red-600 hover:text-red-700 text-sm font-medium">
//                           Revoke
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Notification Settings */}
//               {activeTab === 'notifications' && (
//                 <motion.div
//                   key="notifications"
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
//                 >
//                   <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                     <div className="flex items-center gap-2">
//                       <FiBell className="text-blue-600 text-xl" />
//                       <div>
//                         <h2 className="text-xl font-bold text-slate-900">Notification Preferences</h2>
//                         <p className="text-sm text-slate-500 mt-1">Choose how you want to be notified</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="p-6 space-y-6">
//                     {Object.entries(notificationSettings).map(([key, value]) => (
//                       <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
//                         <div>
//                           <p className="font-medium text-slate-900 capitalize">
//                             {key.replace(/([A-Z])/g, ' $1').trim()}
//                           </p>
//                           <p className="text-sm text-slate-500">
//                             Receive notifications about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleNotificationToggle(key)}
//                           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                             value ? 'bg-blue-600' : 'bg-slate-200'
//                           }`}
//                         >
//                           <span
//                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                               value ? 'translate-x-6' : 'translate-x-1'
//                             }`}
//                           />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Preferences */}
//               {activeTab === 'preferences' && (
//                 <motion.div
//                   key="preferences"
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
//                 >
//                   <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                     <div className="flex items-center gap-2">
//                       <FiGlobe className="text-blue-600 text-xl" />
//                       <div>
//                         <h2 className="text-xl font-bold text-slate-900">Preferences</h2>
//                         <p className="text-sm text-slate-500 mt-1">Customize your experience</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="p-6 space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
//                       <select className="w-full md:w-64 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500">
//                         <option>English (US)</option>
//                         <option>Hindi</option>
//                         <option>Bengali</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
//                       <select className="w-full md:w-64 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500">
//                         <option>Asia/Kolkata (IST)</option>
//                         <option>America/New York (EST)</option>
//                         <option>Europe/London (GMT)</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
//                       <select className="w-full md:w-64 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500">
//                         <option>DD/MM/YYYY</option>
//                         <option>MM/DD/YYYY</option>
//                         <option>YYYY-MM-DD</option>
//                       </select>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Billing */}
//               {activeTab === 'billing' && (
//                 <motion.div
//                   key="billing"
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="space-y-6"
//                 >
//                   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                     <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                       <div className="flex items-center gap-2">
//                         <FiCreditCard className="text-blue-600 text-xl" />
//                         <div>
//                           <h2 className="text-xl font-bold text-slate-900">Payment Methods</h2>
//                           <p className="text-sm text-slate-500 mt-1">Manage your payment methods</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="p-6">
//                       <div className="border rounded-xl p-4 mb-4">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded"></div>
//                             <div>
//                               <p className="font-medium text-slate-900">•••• •••• •••• 4242</p>
//                               <p className="text-xs text-slate-500">Expires 12/2025</p>
//                             </div>
//                           </div>
//                           <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Default</span>
//                         </div>
//                       </div>
                      
//                       <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
//                         <FiPlus />
//                         Add Payment Method
//                       </button>
//                     </div>
//                   </div>

//                   {/* Billing History */}
//                   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                     <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
//                       <h2 className="text-xl font-bold text-slate-900">Billing History</h2>
//                     </div>
//                     <div className="p-6">
//                       <div className="space-y-3">
//                         {[1, 2, 3].map((i) => (
//                           <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
//                             <div>
//                               <p className="font-medium text-slate-900">GST Registration - Basic Plan</p>
//                               <p className="text-xs text-slate-500">Dec 15, 2024</p>
//                             </div>
//                             <div className="text-right">
//                               <p className="font-semibold text-slate-900">₹2,999</p>
//                               <span className="text-xs text-green-600">Paid</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setting;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { updateProfile, changePassword, updateAvatar } from '../../api/user/profileApi';
import { toast } from 'react-hot-toast';

// Icons
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiLock, 
  FiSave, 
  FiCamera, 
  FiShield, 
  FiBell, 
  FiGlobe, 
  FiMonitor,
  FiSmartphone,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiLogOut,
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiX,
  FiCheck,
  FiRefreshCw,
  FiCreditCard,
  FiActivity,
  FiSettings as FiSettingsIcon,
  FiKey,
  FiUserCheck,
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiHome,
  FiMail as FiMailIcon,
  FiPhoneCall,
  FiGlobe as FiGlobeIcon
} from 'react-icons/fi';
import { 
  FaGoogle, 
  FaFacebook, 
  FaGithub,
  FaRegIdCard,  
} from 'react-icons/fa';
import { MdVerified, MdSecurity, MdLocationOn } from 'react-icons/md';

import { IoMdFingerPrint } from "react-icons/io";

const Setting = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  
  // Profile Form State - Matches backend structure
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    userDetails: {
      identity: {
        phone: '',
        panCard: '',
        aadhaarCard: ''
      },
      address: {
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      }
    }
  });
  
  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: '',
    bg: '',
    width: '0%'
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || '',
        userDetails: {
          identity: {
            phone: user.userDetails?.identity?.phone || '',
            panCard: user.userDetails?.identity?.panCard || '',
            aadhaarCard: user.userDetails?.identity?.aadhaarCard || ''
          },
          address: {
            streetAddress: user.userDetails?.address?.streetAddress || '',
            city: user.userDetails?.address?.city || '',
            state: user.userDetails?.address?.state || '',
            postalCode: user.userDetails?.address?.postalCode || '',
            country: user.userDetails?.address?.country || 'India'
          }
        }
      });
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthMap = {
      0: { message: 'Very Weak', color: 'text-red-500', bg: 'bg-red-500', width: '20%' },
      1: { message: 'Weak', color: 'text-orange-500', bg: 'bg-orange-500', width: '40%' },
      2: { message: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500', width: '60%' },
      3: { message: 'Good', color: 'text-blue-500', bg: 'bg-blue-500', width: '80%' },
      4: { message: 'Strong', color: 'text-green-500', bg: 'bg-green-500', width: '100%' },
      5: { message: 'Very Strong', color: 'text-emerald-500', bg: 'bg-emerald-500', width: '100%' }
    };

    return strengthMap[score] || strengthMap[0];
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswordForm({ ...passwordForm, newPassword });
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Prepare data in the format expected by backend
      const updateData = {
        fullName: profileForm.fullName,
        address: profileForm.userDetails.address,
        identity: profileForm.userDetails.identity
      };
      
      const response = await updateProfile(updateData);
      if (response.success) {
        // Update user context with new data
        updateUser(response.user);
        toast.success(response.message || 'Profile updated successfully!');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      if (response.success) {
        toast.success(response.message || 'Password changed successfully!');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordStrength({ score: 0, message: '', color: '', bg: '', width: '0%' });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, WEBP)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    setIsLoading(true);
    try {
      const response = await updateAvatar(formData);
      if (response.success) {
        updateUser(response.user);
        toast.success('Avatar updated successfully!');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update avatar');
      // Revert preview on error
      setAvatarPreview(user?.avatar);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser, description: 'Manage your personal information' },
    { id: 'security', label: 'Security', icon: FiShield, description: 'Password & security settings' },
    { id: 'address', label: 'Address', icon: MdLocationOn, description: 'Manage your addresses' },
    { id: 'notifications', label: 'Notifications', icon: FiBell, description: 'Configure notification preferences' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-slate-500 mt-2">Manage your account preferences and security settings</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0"
          >
            {/* Profile Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="relative inline-block group">
                  <div className="relative">
                    <img
                      src={avatarPreview || user?.avatar || `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(user?.fullName || 'User')}&size=120&bold=true`}
                      alt={user?.fullName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
                    >
                      <FiCamera className="text-slate-600 text-sm" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{user?.fullName}</h3>
                <p className="text-sm text-slate-500">{user?.email}</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    <FiShield className="text-xs" />
                    {user?.role?.toUpperCase()}
                  </span>
                  {user?.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <MdVerified className="text-sm" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 text-blue-700'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Icon className={`text-lg ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div className="text-left flex-1">
                      <p className={`font-medium ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                        {tab.label}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{tab.description}</p>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                  </button>
                );
              })}
            </div>

            {/* Danger Zone */}
            <div className="mt-6 p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <FiAlertCircle className="text-red-500" />
                <h4 className="font-semibold text-red-700">Danger Zone</h4>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium"
              >
                <FiLogOut />
                Logout Account
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-blue-600 text-xl" />
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
                        <p className="text-sm text-slate-500 mt-1">Update your personal details and contact information</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={profileForm.fullName}
                            onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            value={user?.email || ''}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                            disabled
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            value={profileForm.userDetails.identity.phone}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                identity: {
                                  ...profileForm.userDetails.identity,
                                  phone: e.target.value
                                }
                              }
                            })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          PAN Card
                        </label>
                        <div className="relative">
                          <FaRegIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={profileForm.userDetails.identity.panCard}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                identity: {
                                  ...profileForm.userDetails.identity,
                                  panCard: e.target.value.toUpperCase()
                                }
                              }
                            })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
                            placeholder="Enter PAN card number"
                            maxLength="10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Aadhaar Card
                        </label>
                        <div className="relative">
                          <IoMdFingerPrint className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={profileForm.userDetails.identity.aadhaarCard}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                identity: {
                                  ...profileForm.userDetails.identity,
                                  aadhaarCard: e.target.value
                                } 
                              }
                            })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter Aadhaar number"
                            maxLength="12"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <FiRefreshCw className="animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Change Password */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
                      <div className="flex items-center gap-2">
                        <FiKey className="text-blue-600 text-xl" />
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
                          <p className="text-sm text-slate-500 mt-1">Update your password to keep your account secure</p>
                        </div>
                      </div>
                    </div>
                    
                    <form onSubmit={handlePasswordChangeSubmit} className="p-6 space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                        </div>
                        {passwordForm.newPassword && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ${passwordStrength.bg}`}
                                  style={{ width: passwordStrength.width }}
                                />
                              </div>
                              <span className={`text-xs font-medium ${passwordStrength.color}`}>
                                {passwordStrength.message}
                              </span>
                            </div>
                            <ul className="text-xs text-slate-500 space-y-1 mt-2">
                              <li className="flex items-center gap-1">
                                {passwordForm.newPassword.length >= 6 ? <FiCheckCircle className="text-green-500 text-xs" /> : <FiXCircle className="text-slate-300 text-xs" />}
                                <span>At least 6 characters</span>
                              </li>
                              <li className="flex items-center gap-1">
                                {/[A-Z]/.test(passwordForm.newPassword) ? <FiCheckCircle className="text-green-500 text-xs" /> : <FiXCircle className="text-slate-300 text-xs" />}
                                <span>At least one uppercase letter</span>
                              </li>
                              <li className="flex items-center gap-1">
                                {/[0-9]/.test(passwordForm.newPassword) ? <FiCheckCircle className="text-green-500 text-xs" /> : <FiXCircle className="text-slate-300 text-xs" />}
                                <span>At least one number</span>
                              </li>
                              <li className="flex items-center gap-1">
                                {/[^A-Za-z0-9]/.test(passwordForm.newPassword) ? <FiCheckCircle className="text-green-500 text-xs" /> : <FiXCircle className="text-slate-300 text-xs" />}
                                <span>At least one special character</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                        </div>
                        {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                        >
                          {isLoading ? (
                            <>
                              <FiRefreshCw className="animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <FiSave />
                              Update Password
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Address Settings */}
              {activeTab === 'address' && (
                <motion.div
                  key="address"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-2">
                      <MdLocationOn className="text-blue-600 text-xl" />
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">Address Information</h2>
                        <p className="text-sm text-slate-500 mt-1">Update your address details for communication and deliveries</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Street Address
                        </label>
                        <div className="relative">
                          <FiHome className="absolute left-3 top-3 text-slate-400" />
                          <textarea
                            value={profileForm.userDetails.address.streetAddress}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                address: {
                                  ...profileForm.userDetails.address,
                                  streetAddress: e.target.value
                                }
                              }
                            })}
                            rows="2"
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                            placeholder="Enter your street address"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          City
                        </label>
                        <div className="relative">
                          <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={profileForm.userDetails.address.city}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                address: {
                                  ...profileForm.userDetails.address,
                                  city: e.target.value
                                }
                              }
                            })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter city"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          State
                        </label>
                        <div className="relative">
                          <FiGlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={profileForm.userDetails.address.state}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                address: {
                                  ...profileForm.userDetails.address,
                                  state: e.target.value
                                }
                              }
                            })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter state"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Postal Code
                        </label>
                        <div className="relative">
                          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={profileForm.userDetails.address.postalCode}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                address: {
                                  ...profileForm.userDetails.address,
                                  postalCode: e.target.value
                                }
                              }
                            })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter postal code"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Country
                        </label>
                        <div className="relative">
                          <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={profileForm.userDetails.address.country}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              userDetails: {
                                ...profileForm.userDetails,
                                address: {
                                  ...profileForm.userDetails.address,
                                  country: e.target.value
                                }
                              }
                            })}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter country"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <FiRefreshCw className="animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave />
                            Save Address
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-2">
                      <FiBell className="text-blue-600 text-xl" />
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">Notification Preferences</h2>
                        <p className="text-sm text-slate-500 mt-1">Choose how you want to be notified</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                        { id: 'push', label: 'Push Notifications', description: 'Get real-time alerts on your device' },
                        { id: 'sms', label: 'SMS Alerts', description: 'Important updates via text message' },
                        { id: 'marketing', label: 'Marketing Communications', description: 'Newsletters and special offers' }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                          <div>
                            <p className="font-medium text-slate-900">{item.label}</p>
                            <p className="text-sm text-slate-500">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={item.id === 'email'} />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                        <FiSave />
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
