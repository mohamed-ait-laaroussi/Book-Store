import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Package, User, Settings, LogOut, ShoppingBag, Heart, Bell } from 'lucide-react';

interface OrderType {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  items: {
    id: string;
    title: string;
    coverImage: string;
    price: number;
    quantity: number;
  }[];
}

// Mock orders data
const mockOrders: OrderType[] = [
  {
    id: 'ORD-001',
    date: '2025-01-15',
    total: 46.94,
    status: 'delivered',
    items: [
      {
        id: '1',
        title: 'The Silent Patient',
        coverImage: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 24.99,
        quantity: 1
      },
      {
        id: '3',
        title: 'Atomic Habits',
        coverImage: 'https://images.pexels.com/photos/6475045/pexels-photo-6475045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 18.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-12-28',
    total: 25.49,
    status: 'shipped',
    items: [
      {
        id: '6',
        title: 'Project Hail Mary',
        coverImage: 'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 25.49,
        quantity: 1
      }
    ]
  }
];

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    alert('Profile updated successfully!');
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                        activeTab === 'orders' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Orders
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                        activeTab === 'profile' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                        activeTab === 'wishlist' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className="w-5 h-5 mr-3" />
                      Wishlist
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('notifications')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                        activeTab === 'notifications' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Bell className="w-5 h-5 mr-3" />
                      Notifications
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                        activeTab === 'settings' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Settings
                    </button>
                  </li>
                  <li className="pt-2 border-t border-gray-200 mt-2">
                    <button 
                      onClick={logout}
                      className="w-full flex items-center px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Your Orders</h2>
                  
                  {mockOrders.length > 0 ? (
                    <div className="space-y-6">
                      {mockOrders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 flex flex-wrap justify-between items-center border-b border-gray-200">
                            <div>
                              <p className="text-sm text-gray-600">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === 'delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <span className="ml-4 font-medium">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            {order.items.map(item => (
                              <div key={item.id} className="flex py-3 border-b border-gray-200 last:border-0">
                                <img 
                                  src={item.coverImage} 
                                  alt={item.title} 
                                  className="w-12 h-16 object-cover rounded"
                                />
                                <div className="ml-4 flex-grow">
                                  <h3 className="text-gray-800 font-medium">{item.title}</h3>
                                  <div className="flex justify-between mt-1">
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-gray-50 px-4 py-3 flex justify-end border-t border-gray-200">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Order Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 text-gray-400">
                        <ShoppingBag className="w-full h-full" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                      <p className="mt-1 text-gray-500">
                        When you place an order, it will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={profileForm.address}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Other tabs (wishlist, notifications, settings) would be implemented similarly */}
              {activeTab === 'wishlist' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Your Wishlist</h2>
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 text-gray-400">
                      <Heart className="w-full h-full" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                    <p className="mt-1 text-gray-500">
                      Save items you're interested in for later.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 text-gray-400">
                      <Bell className="w-full h-full" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
                    <p className="mt-1 text-gray-500">
                      You don't have any notifications at this time.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b">
                        <h3 className="font-medium">Email Preferences</h3>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium text-gray-800">Order updates</p>
                            <p className="text-sm text-gray-600">Receive updates about your orders</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-t">
                          <div>
                            <p className="font-medium text-gray-800">Promotions and offers</p>
                            <p className="text-sm text-gray-600">Receive updates about sales and new arrivals</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-t">
                          <div>
                            <p className="font-medium text-gray-800">Personalized recommendations</p>
                            <p className="text-sm text-gray-600">Receive personalized book suggestions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b">
                        <h3 className="font-medium">Security</h3>
                      </div>
                      <div className="p-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Change Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b">
                        <h3 className="font-medium">Account Actions</h3>
                      </div>
                      <div className="p-4">
                        <button className="text-red-600 hover:text-red-800 font-medium">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;