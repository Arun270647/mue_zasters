import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, Music, Mail } from 'lucide-react';

interface Application {
  id: number;
  stageName: string;
  email: string;
  genre: string;
  bio: string;
  portfolioLinks: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      stageName: "The Midnight Echo",
      email: "echo@example.com",
      genre: "rock",
      bio: "Passionate rock band with 5 years of live performance experience. We specialize in classic rock with modern twists and have performed at various local venues.",
      portfolioLinks: "https://youtube.com/@midnightecho\nhttps://spotify.com/artist/midnightecho",
      status: 'pending',
      submittedAt: '2025-01-15T10:30:00Z'
    },
    {
      id: 2,
      stageName: "Luna Rivers",
      email: "luna@example.com",
      genre: "folk",
      bio: "Singer-songwriter focusing on acoustic folk music with heartfelt lyrics. I've been performing for 8 years and have released 2 independent albums.",
      portfolioLinks: "https://soundcloud.com/lunarivers\nhttps://instagram.com/lunarivers_music",
      status: 'approved',
      submittedAt: '2025-01-14T14:22:00Z'
    },
    {
      id: 3,
      stageName: "DJ Synth Wave",
      email: "synthwave@example.com",
      genre: "electronic",
      bio: "Electronic music producer and DJ specializing in synthwave and retro electronic music. Regular performer at electronic music festivals.",
      portfolioLinks: "https://soundcloud.com/djsynthwave\nhttps://youtube.com/@synthwave_official",
      status: 'rejected',
      submittedAt: '2025-01-13T09:15:00Z'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleApprove = async (id: number) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setApplications(apps => 
        apps.map(app => 
          app.id === id ? { ...app, status: 'approved' as const } : app
        )
      );
      setLoading(false);
    }, 1000);
  };

  const handleReject = async (id: number) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setApplications(apps => 
        apps.map(app => 
          app.id === id ? { ...app, status: 'rejected' as const } : app
        )
      );
      setLoading(false);
    }, 1000);
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

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage artist applications and approve talented performers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Artist Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
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
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Music className="w-6 h-6 text-purple-500 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.stageName}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="w-3 h-3 mr-1" />
                            {application.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-sm text-gray-900">
                        {application.genre}
                      </span>
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
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {application.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(application.id)}
                            disabled={loading}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(application.id)}
                            disabled={loading}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;