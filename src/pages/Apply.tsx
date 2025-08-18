import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Music, FileText, Link as LinkIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { artistAPI } from '../utils/api';

const Apply: React.FC = () => {
  const [formData, setFormData] = useState({
    stage_name: '',
    genre: '',
    bio: '',
    portfolio_links: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  const authenticated = isAuthenticated();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await artistAPI.apply(formData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/artist/dashboard', { 
          state: { message: 'Application submitted successfully! We\'ll review it and get back to you soon.' }
        });
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Application submission failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // If not authenticated, show login prompt
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <User className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to submit an artist application.
            </p>
            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors inline-block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors inline-block"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
            <p className="text-gray-600">
              Thank you for your application. We'll review it and get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Artist Application</h1>
          <p className="mt-2 text-gray-600">
            Tell us about yourself and showcase your musical talent
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          {error && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="stage_name" className="block text-sm font-medium text-gray-700 mb-2">
              Stage Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="stage_name"
                name="stage_name"
                required
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your artist/stage name"
                value={formData.stage_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Genre *
            </label>
            <div className="relative">
              <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="genre"
                name="genre"
                required
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.genre}
                onChange={handleChange}
              >
                <option value="">Select a genre</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="electronic">Electronic</option>
                <option value="hip-hop">Hip Hop</option>
                <option value="country">Country</option>
                <option value="folk">Folk</option>
                <option value="r&b">R&B</option>
                <option value="indie">Indie</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Artist Bio *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                id="bio"
                name="bio"
                required
                rows={5}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Tell us about your musical background, experience, and what makes you unique as an artist..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Minimum 50 characters required</p>
          </div>

          <div>
            <label htmlFor="portfolio_links" className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio Links
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                id="portfolio_links"
                name="portfolio_links"
                rows={3}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Share links to your music, videos, social media, website, etc. (one per line)"
                value={formData.portfolio_links}
                onChange={handleChange}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Examples: Spotify, YouTube, SoundCloud, Instagram, personal website
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• We'll review your application within 3-5 business days</li>
              <li>• Our team may reach out for additional information</li>
              <li>• Approved artists will be notified via email</li>
              <li>• You'll get access to our artist dashboard and event opportunities</li>
            </ul>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || formData.bio.length < 50}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;