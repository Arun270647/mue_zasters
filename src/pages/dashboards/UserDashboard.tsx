import React from 'react';
import { User, Mail, Calendar, MapPin, Bell, Settings, Star, Heart } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const userInfo = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinedDate: '2024-11-15',
    location: 'New York, NY',
    favoriteGenres: ['Rock', 'Jazz', 'Electronic'],
    eventsAttended: 12,
    upcomingEvents: 3
  };

  const recentActivity = [
    { type: 'event', message: 'Registered for Summer Music Festival 2025', date: '2025-01-14' },
    { type: 'favorite', message: 'Added Luna Rivers to favorites', date: '2025-01-12' },
    { type: 'event', message: 'Attended Jazz Night Under the Stars', date: '2025-01-10' },
    { type: 'profile', message: 'Updated profile information', date: '2025-01-08' }
  ];

  const upcomingEvents = [
    {
      title: 'Summer Music Festival 2025',
      date: '2025-07-15',
      venue: 'Central Park Amphitheater',
      status: 'confirmed'
    },
    {
      title: 'Electronic Beats Showcase',
      date: '2025-09-10',
      venue: 'Downtown Convention Center',
      status: 'waitlist'
    }
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

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userInfo.name}!</h1>
          <p className="mt-2 text-gray-600">Your personal music event dashboard</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{userInfo.name}</h2>
                <p className="text-gray-500">{userInfo.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span>Joined {new Date(userInfo.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{userInfo.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span>Verified Account</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {userInfo.favoriteGenres.map((genre, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{userInfo.eventsAttended}</p>
                  <p className="text-xs text-gray-500">Events Attended</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{userInfo.upcomingEvents}</p>
                  <p className="text-xs text-gray-500">Upcoming</p>
                </div>
              </div>

              <button className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              </div>
              <div className="p-6">
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <Calendar className="w-8 h-8 text-purple-500 mr-3" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-500">{event.venue}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          event.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming events</p>
                    <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Browse Events
                    </button>
                  </div>
                )}
              </div>
            </div>

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
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
                    <Calendar className="w-5 h-5 text-purple-500 mr-3" />
                    <span className="font-medium">Browse Events</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                    <Star className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="font-medium">Discover Artists</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;