import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, MapPin, Bell, Settings, Star, Heart, RefreshCw, Edit } from 'lucide-react';
import { userAPI } from '../../utils/api';

interface UserProfile {
  _id: string;
  email: string;
  role: number;
  created_at: string;
}

const UserDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    location: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userAPI.getProfile();
      setProfile(data);
      
      // Set edit data from profile
      setEditData({
        name: data.name || '',
        location: data.location || '',
        bio: data.bio || ''
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch profile';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      await userAPI.updateProfile(editData);
      await fetchProfile(); // Refresh profile data
      setEditMode(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const recentActivity = [
    { type: 'profile', message: 'Profile information updated', date: new Date().toISOString() },
    { type: 'event', message: 'Browsed upcoming musical events', date: new Date(Date.now() - 86400000).toISOString() },
    { type: 'favorite', message: 'Explored artist profiles', date: new Date(Date.now() - 172800000).toISOString() },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'favorite':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'profile':
        return <User className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="mt-2 text-gray-600">Your personal music event dashboard</p>
          </div>
          <button
            onClick={fetchProfile}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editData.name || 'Music Lover'}
                </h2>
                <p className="text-gray-500">{profile.email}</p>
              </div>

              {editMode ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({...editData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {updateLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                      <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    {editData.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                        <span>{editData.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-3 text-gray-400" />
                      <span>Verified Account</span>
                    </div>
                  </div>

                  {editData.bio && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Bio</h3>
                      <p className="text-sm text-gray-600">{editData.bio}</p>
                    </div>
                  )}

                  <button 
                    onClick={() => setEditMode(true)}
                    className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-purple-500 mr-3" />
                    <span className="font-medium">Browse Events</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = '/apply'}
                    className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <Star className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="font-medium">Become an Artist</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                    <Bell className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-medium">Notification Settings</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-200 transition-colors">
                    <Heart className="w-5 h-5 text-red-500 mr-3" />
                    <span className="font-medium">My Favorites</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artist Application CTA */}
            {profile.role === 2 && (
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ready to become an artist?</h3>
                    <p className="text-purple-100">
                      Join our community of talented musicians and start performing at amazing events!
                    </p>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/apply'}
                    className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;