import React, { useState, useEffect } from 'react';
import { Music, Calendar, Users, Star, FileText, ExternalLink, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { artistAPI } from '../../utils/api';

interface Application {
  _id: string;
  stage_name: string;
  genres: string[];
  bio: string;
  portfolio_links: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

const ArtistDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await artistAPI.getMyApplications();
      setApplications(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch applications';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Congratulations! Your application has been approved. You now have artist privileges.';
      case 'rejected':
        return 'Unfortunately, your application was not approved at this time. You can submit a new application.';
      default:
        return 'Your application is being reviewed. We\'ll get back to you within 3-5 business days.';
    }
  };

  const stats = [
    { label: 'Applications Submitted', value: applications.length.toString(), icon: FileText, color: 'text-blue-500' },
    { label: 'Approved Applications', value: applications.filter(app => app.status === 'approved').length.toString(), icon: CheckCircle, color: 'text-green-500' },
    { label: 'Pending Review', value: applications.filter(app => app.status === 'pending').length.toString(), icon: Clock, color: 'text-yellow-500' },
    { label: 'Portfolio Items', value: applications.reduce((total, app) => total + app.portfolio_links.length, 0).toString(), icon: Music, color: 'text-purple-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Artist Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your applications and track your artist journey</p>
          </div>
          <button
            onClick={fetchApplications}
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications Section */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h2>
            <p className="text-gray-600 mb-6">
              Ready to showcase your talent? Submit your first artist application and get discovered!
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              Submit Application
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div key={application._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{application.stage_name}</h3>
                    <div className="flex items-center">
                      {getStatusIcon(application.status)}
                      <span className={`ml-2 px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Genres</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {application.genres.map((genre, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize">
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{application.bio}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Portfolio Links</h4>
                      {application.portfolio_links.length > 0 ? (
                        <div className="space-y-2">
                          {application.portfolio_links.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-purple-600 hover:text-purple-700 text-sm"
                            >
                              <ExternalLink className="w-3 h-3 mr-2" />
                              {link}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No portfolio links provided</p>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          <strong>Submitted:</strong> {new Date(application.created_at).toLocaleDateString()}
                        </p>
                        {application.updated_at !== application.created_at && (
                          <p className="text-xs text-gray-500">
                            <strong>Updated:</strong> {new Date(application.updated_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Status Update:</strong> {getStatusMessage(application.status)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <Link
                to="/apply"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Submit New Application
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDashboard;