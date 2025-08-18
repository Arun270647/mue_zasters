import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, Music, Mail, RefreshCw } from 'lucide-react';
import { adminAPI } from '../../utils/api';

interface Application {
  _id: string;
  user_id: string;
  stage_name: string;
  email: string;
  genres: string[];
  bio: string;
  portfolio_links: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface Stats {
  total_users: number;
  total_artists: number;
  pending_applications: number;
  approved_applications: number;
  rejected_applications: number;
}

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats>({
    total_users: 0,
    total_artists: 0,
    pending_applications: 0,
    approved_applications: 0,
    rejected_applications: 0
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [applicationsData, statsData] = await Promise.all([
        adminAPI.getApplications(),
        adminAPI.getStats()
      ]);
      
      setApplications(applicationsData);
      setStats(statsData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to fetch data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (applicationId: string) => {
    try {
      setActionLoading(applicationId);
      await adminAPI.approveApplication(applicationId);
      
      // Refresh data to show updated status
      await fetchData();
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to approve application';
      setError(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (applicationId: string) => {
    try {
      setActionLoading(applicationId);
      await adminAPI.rejectApplication(applicationId);
      
      // Refresh data to show updated status
      await fetchData();
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to reject application';
      setError(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage artist applications and approve talented performers</p>
          </div>
          <button
            onClick={fetchData}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_users}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Music className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Artists</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_artists}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending_applications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved_applications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected_applications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Artist Applications</h2>
          </div>
          
          {applications.length === 0 ? (
            <div className="p-8 text-center">
              <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artist
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Genres
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Music className="w-6 h-6 text-purple-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.stage_name}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="w-3 h-3 mr-1" />
                              {application.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {application.genres.map((genre, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full capitalize">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(application.status)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {application.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(application._id)}
                              disabled={actionLoading === application._id}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
                            >
                              {actionLoading === application._id ? (
                                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                              ) : (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              )}
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(application._id)}
                              disabled={actionLoading === application._id}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center"
                            >
                              {actionLoading === application._id ? (
                                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              Reject
                            </button>
                          </div>
                        )}
                        {application.status !== 'pending' && (
                          <span className="text-gray-400 italic">
                            {application.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;