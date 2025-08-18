import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Music, Users, Star, Mail, Phone, Clock } from 'lucide-react';

const Landing: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "Summer Music Festival 2025",
      date: "2025-07-15",
      venue: "Central Park Amphitheater",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
    },
    {
      id: 2,
      title: "Jazz Night Under the Stars",
      date: "2025-08-22",
      venue: "Riverside Concert Hall",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
    },
    {
      id: 3,
      title: "Electronic Beats Showcase",
      date: "2025-09-10",
      venue: "Downtown Convention Center",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Discover Amazing
            <span className="block text-yellow-300">Musical Events</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect with talented artists and unforgettable performances. Whether you're an artist or music lover, find your perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors transform hover:scale-105"
            >
              I'm an Artist → Apply
            </Link>
            <Link
              to="/login"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose EventTune?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Music className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">For Artists</h3>
              <p className="text-gray-600">Showcase your talent and connect with event organizers looking for amazing performers.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">For Organizers</h3>
              <p className="text-gray-600">Find the perfect artists for your events and manage applications seamlessly.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">For Fans</h3>
              <p className="text-gray-600">Discover incredible musical events and never miss out on amazing performances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-bold">EventTune</span>
              </div>
              <p className="text-gray-400">Connecting artists and audiences through amazing musical experiences.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-gray-300">hello@eventtune.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-gray-300">Mon-Fri 9AM-6PM EST</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/apply" className="block text-gray-300 hover:text-white transition-colors">Artist Applications</Link>
                <Link to="/login" className="block text-gray-300 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="block text-gray-300 hover:text-white transition-colors">Register</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EventTune. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;