import { ref, computed } from 'vue';
import directus from '@/services/directus';
import { readMe, createUser, readUsers, withToken } from '@directus/sdk';

const user = ref(null);
const token = ref(localStorage.getItem('auth_token'));
const isAuthenticated = computed(() => !!user.value);

export function useAuth() {
  // Login function
  const login = async (email, password) => {
    try {
      // Direct fetch to Directus auth endpoint
      const response = await fetch('http://0.0.0.0:8055/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      // Handle 401 Unauthorized
      if (response.status === 401) {
        return {
          success: false,
          error: 'Invalid email or password. Please check your credentials and try again.'
        };
      }

      // Handle other error responses
      if (!response.ok) {
        return {
          success: false,
          error: data.errors?.[0]?.message || 'Login failed. Please try again.'
        };
      }

      if (data.data && data.data.access_token) {
        token.value = data.data.access_token;
        localStorage.setItem('auth_token', data.data.access_token);
        
        // Fetch user data
        await getCurrentUser();
        
        return { success: true, user: user.value };
      } else {
        return {
          success: false,
          error: data.errors?.[0]?.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Unable to connect to the server. Please check your internet connection.' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Note: Make sure PUBLIC_REGISTRATION=true in Directus .env
      // And PUBLIC_REGISTRATION_ROLE is set to customer role UUID
      
      const response = await fetch('http://0.0.0.0:8055/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName,
          last_name: userData.lastName
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Auto login after registration
        return await login(userData.email, userData.password);
      } else {
        return {
          success: false,
          error: data.errors?.[0]?.message || 'Registration failed. Make sure PUBLIC_REGISTRATION is enabled in Directus.'
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Make sure PUBLIC_REGISTRATION is enabled in Directus.' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (token.value) {
        await fetch('http://0.0.0.0:8055/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_refresh_token');
    }
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      if (!token.value) return null;
      
      const response = await fetch('http://0.0.0.0:8055/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (response.ok && data.data) {
        user.value = data.data;
        return data.data;
      } else {
        user.value = null;
        return null;
      }
    } catch (error) {
      console.error('Get user error:', error);
      user.value = null;
      return null;
    }
  };

  // Check if user is logged in on app start
  const checkAuth = async () => {
    if (token.value) {
      await getCurrentUser();
    }
  };

  // Password reset request
  const requestPasswordReset = async (email) => {
    try {
      const response = await fetch('http://0.0.0.0:8055/auth/password/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: data.errors?.[0]?.message || 'Failed to send reset email'
        };
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send reset email' 
      };
    }
  };

  // Reset password with token
  const resetPassword = async (resetToken, newPassword) => {
    try {
      const response = await fetch('http://0.0.0.0:8055/auth/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken,
          password: newPassword
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: data.errors?.[0]?.message || 'Failed to reset password'
        };
      }
    } catch (error) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to reset password' 
      };
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    getCurrentUser,
    checkAuth,
    requestPasswordReset,
    resetPassword
  };
}
