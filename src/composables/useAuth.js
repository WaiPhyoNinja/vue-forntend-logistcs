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
      const response = await fetch('https://admin.westeastfreight.com/auth/login', {
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
      // Customer role ID from Directus
      const CUSTOMER_ROLE_ID = '9162cd13-ae93-4c85-bba9-8d388f2cf1f2';
      
      const response = await fetch('https://admin.westeastfreight.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: CUSTOMER_ROLE_ID,
          status: 'active'
        })
      });

      console.log('Registration response status:', response.status);

      // Safely parse JSON response
      let data = null;
      const text = await response.text();
      
      if (text) {
        try {
          data = JSON.parse(text);
          console.log('Registration response data:', data);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', text);
        }
      } else {
        console.log('Empty response body (likely 204 No Content - success)');
      }

      if (response.ok) {
        console.log('Registration successful (status:', response.status, '), attempting auto-login');
        // Auto login after registration
        return await login(userData.email, userData.password);
      } else {
        // Handle error responses
        let errorMessage = 'Registration failed.';
        
        if (response.status === 403) {
          errorMessage = 'Registration is currently disabled. Please contact the administrator to enable PUBLIC_REGISTRATION in Directus settings.';
        } else if (response.status === 422) {
          errorMessage = data?.errors?.[0]?.message || 'This email is already registered or the data is invalid.';
        } else if (response.status === 400) {
          errorMessage = data?.errors?.[0]?.message || 'Invalid registration data. Please check your information.';
        } else if (data?.errors && data.errors.length > 0) {
          errorMessage = data.errors[0].message;
        } else {
          errorMessage = data?.errors?.[0]?.message || 'Registration failed. Please try again.';
        }
        return {
          success: false,
          error: errorMessage
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
        await fetch('https://admin.westeastfreight.com/auth/logout', {
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
      if (!token.value) {
        user.value = null;
        return null;
      }
      
      const response = await fetch('https://admin.westeastfreight.com/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        }
      });

      // If 403 or 401, token is invalid - clear it silently
      if (response.status === 403 || response.status === 401) {
        user.value = null;
        token.value = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
        return null;
      }

      const data = await response.json();
      
      if (response.ok && data.data) {
        user.value = data.data;
        return data.data;
      } else {
        user.value = null;
        return null;
      }
    } catch (error) {
      // Don't log 403/401 errors as they're expected when not logged in
      if (error.response?.status !== 403 && error.response?.status !== 401) {
        console.error('Get user error:', error);
      }
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
      const response = await fetch('https://admin.westeastfreight.com/auth/password/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          reset_url: 'https://westeastfreight.com/reset-password'
        })
      });

      console.log('Password reset response status:', response.status);
      
      // Directus returns 204 No Content on success (no response body)
      if (response.ok) {
        return { success: true };
      }
      
      // Only try to parse JSON if there's an error response
      const text = await response.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.log('Non-JSON response:', text);
        }
      }
      
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to send reset email. Please check if the email exists.'
      };
    } catch (error) {
      console.error('Password reset request error:', error);
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      };
    }
  };

  // Reset password with token
  const resetPassword = async (resetToken, newPassword) => {
    try {
      const response = await fetch('https://admin.westeastfreight.com/auth/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken,
          password: newPassword
        })
      });

      console.log('Password reset response status:', response.status);
      
      // Directus returns 204 No Content on success
      if (response.ok) {
        return { success: true };
      }
      
      // Only try to parse JSON if there's an error response
      const text = await response.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.log('Non-JSON response:', text);
        }
      }
      
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to reset password. The reset link may have expired.'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
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
