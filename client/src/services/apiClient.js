import axios from 'axios';

const apiClient = axios.create({
    // baseURL: process.env.REACT_APP_API_URL, // Use env variable
    headers: {
        'Content-Type': 'application/json',
    },
});


// Optional: Interceptor to add the token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Interceptor to handle common errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response, // Simply return successful responses
    (error) => {
        // Example: Handle 401 Unauthorized - maybe redirect to login or refresh token
        if (error.response && error.response.status === 401) {
           console.log("Unauthorized, logging out.");
             // Potentially call logout() from AuthContext here, but that introduces coupling.
             // A better approach might be to let the component handle the error based on status code.
             // localStorage.removeItem('authToken');
             // window.location.href = '/login'; // Force redirect
        }

        // Reject with the error so components can handle it
        // Extract a cleaner error message if possible
        const message = error.response?.data?.message || error.message || 'An unknown error occurred';
        return Promise.reject(new Error(message));
    }
);


export default apiClient;