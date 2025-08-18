import axiosInstance from './axios';

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/register', { email, password });
    return response.data;
  }
};

// Artist API
export const artistAPI = {
  apply: async (applicationData: {
    stage_name: string;
    genre: string;
    bio: string;
    portfolio_links: string;
  }) => {
    const response = await axiosInstance.post('/artist/apply', applicationData);
    return response.data;
  },
  
  getMyApplications: async () => {
    const response = await axiosInstance.get('/artist/my-applications');
    return response.data;
  }
};

// Admin API
export const adminAPI = {
  getApplications: async () => {
    const response = await axiosInstance.get('/admin/applications');
    return response.data;
  },
  
  approveApplication: async (applicationId: string) => {
    const response = await axiosInstance.post(`/admin/applications/${applicationId}/approve`);
    return response.data;
  },
  
  rejectApplication: async (applicationId: string) => {
    const response = await axiosInstance.post(`/admin/applications/${applicationId}/reject`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await axiosInstance.get('/admin/stats');
    return response.data;
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  },
  
  updateProfile: async (profileData: any) => {
    const response = await axiosInstance.put('/user/profile', profileData);
    return response.data;
  }
};