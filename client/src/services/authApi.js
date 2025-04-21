import apiClient from './apiClient';

const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data; // { _id, email, token }
    } catch (error) {
         console.error('Login API error:', error);
        throw error; // Re-throw the error processed by the interceptor
    }
};

const register = async (name,email, password) => {
    try {
        const response = await apiClient.post('/auth/register', { name, email, password });
        return response.data; // { _id, email, token }
    } catch (error) {
         console.error('Register API error:', error);
        throw error;
    }
};

// Optional: If you need to verify token validity explicitly
const getMe = async (token) => {
     try {
        // Temporarily set header for this specific request if token isn't global yet
         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
         const response = await apiClient.get('/auth/me', config);
         return response.data; // { _id, email, createdAt }
     } catch (error) {
         console.error('Get Me API error:', error);
         throw error;
     }
 };


const authApi = {
    login,
    register,
    getMe,
};

export default authApi;