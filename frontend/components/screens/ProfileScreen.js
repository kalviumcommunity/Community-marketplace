import { useState, useEffect } from 'react';
import { User, X, LayoutDashboard, ShoppingBag, Settings, HelpCircle, Shield, LogOut } from 'lucide-react';

// Mock Firebase Auth for demonstration
const mockAuth = {
  currentUser: {
    uid: 'demo-user-123456',
    displayName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    photoURL: null, // Set to null to show default profile pic
    metadata: {
      createdAt: '1640000000000'
    }
  }
};

export default function ProfileScreen({ onClose, onNavigateToEdit, onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser(mockAuth.currentUser);
      setLoading(false);
    }, 500);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', onClick: () => alert('Navigate to Dashboard') },
    { icon: ShoppingBag, label: 'Orders', onClick: () => alert('Navigate to Orders') },
    { icon: Settings, label: 'Settings', onClick: () => alert('Navigate to Settings') },
    { icon: HelpCircle, label: 'Help & Support', onClick: () => alert('Navigate to Help & Support') },
    { icon: Shield, label: 'Privacy Policy', onClick: () => alert('Navigate to Privacy Policy') }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Container with max width for larger screens */}
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 border-b border-gray-100">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Your Profile</h1>
          <button 
            onClick={onClose || (() => alert('Close profile'))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-center">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
              </div>
            )}
          </div>

          {/* Name */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            {user.displayName || 'User Name'}
          </h2>

          {/* Edit Profile Button */}
          <button
            onClick={onNavigateToEdit || (() => alert('Navigate to Edit Profile'))}
            className="w-full max-w-xs mx-auto px-6 py-2.5 sm:py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-sm sm:text-base"
          >
            Edit Profile
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-4 sm:px-6 md:px-8 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-3 sm:py-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left"
            >
              <item.icon className="w-5 h-5 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium text-gray-800">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <button
            onClick={onLogout || (() => alert('Logout clicked'))}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}