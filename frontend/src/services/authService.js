import { authAPI, userAPI } from '../api';
import { handleAPIError, handleAPISuccess } from '../api';

// Token management
const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const REFRESH_TOKEN_KEY = 'refreshToken';

class AuthService {
  // Get stored token
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  // Set token
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  // Remove token
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  // Get stored user
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Set user
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Remove user
  removeUser() {
    localStorage.removeItem(USER_KEY);
  }

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  // Set refresh token
  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  // Remove refresh token
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  // Check if user is premium
  isPremium() {
    const user = this.getUser();
    if (!user) return false;
    
    if (!user.isPremium) return false;
    
    // Check if premium hasn't expired
    if (user.premiumExpiry) {
      const expiryDate = new Date(user.premiumExpiry);
      return expiryDate > new Date();
    }
    
    return true;
  }

  // Register new user
  async register(userData) {
    try {
      // Handle both object format and individual parameters for backward compatibility
      let requestData;
      if (typeof userData === 'object') {
        requestData = userData;
      } else {
        // Handle individual parameters (name, email, password, phone, dob, gender)
        requestData = {
          name: arguments[0],
          email: arguments[1],
          password: arguments[2],
          phone: arguments[3],
          dob: arguments[4],
          gender: arguments[5]
        };
      }

      const response = await authAPI.register(requestData);
      const { token, user } = response.data;
      
      this.setToken(token);
      this.setUser(user);
      
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Login user (supports both traditional and OTP-based login)
  async login(credentials) {
    try {
      // Handle both object format and individual parameters
      let requestData;
      if (typeof credentials === 'object') {
        requestData = credentials;
      } else {
        // Handle individual parameters (emailOrPhone, password/otp)
        requestData = {
          emailOrPhone: arguments[0],
          password: arguments[1] || undefined,
          otp: arguments[1] || undefined
        };
      }

      const response = await authAPI.login(requestData);
      const { token, user } = response.data;
      
      this.setToken(token);
      this.setUser(user);
      
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Send OTP for login
  async sendOtp(emailOrPhone) {
    try {
      const response = await authAPI.sendOtp(emailOrPhone);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Verify OTP for login
  async verifyOtp(emailOrPhone, otp) {
    try {
      const response = await authAPI.verifyOtp(emailOrPhone, otp);
      const { token, user } = response.data;
      
      this.setToken(token);
      this.setUser(user);
      
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Social login
  async socialLogin(provider, token) {
    try {
      const response = await authAPI.socialLogin(provider, token);
      const { token: authToken, user } = response.data;
      
      this.setToken(authToken);
      this.setUser(user);
      
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Logout user
  logout() {
    this.removeToken();
    this.removeUser();
    this.removeRefreshToken();
    
    // Redirect to login page
    window.location.href = '/login';
  }

  // Get current user from API
  async getCurrentUser() {
    try {
      const response = await authAPI.getCurrentUser();
      const user = response.data;
      
      this.setUser(user);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await userAPI.updateProfile(userData);
      const user = response.data;
      
      this.setUser(user);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await userAPI.getProfile();
      const user = response.data;
      
      this.setUser(user);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Delete account
  async deleteAccount() {
    try {
      const response = await userAPI.deleteAccount();
      this.logout();
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Get user addresses
  async getAddresses() {
    try {
      const response = await userAPI.getAddresses();
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Add address
  async addAddress(addressData) {
    try {
      const response = await userAPI.addAddress(addressData);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Update address
  async updateAddress(addressId, addressData) {
    try {
      const response = await userAPI.updateAddress(addressId, addressData);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Delete address
  async deleteAddress(addressId) {
    try {
      const response = await userAPI.deleteAddress(addressId);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Get saved cards
  async getSavedCards() {
    try {
      const response = await userAPI.getSavedCards();
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Add saved card
  async addSavedCard(cardData) {
    try {
      const response = await userAPI.addSavedCard(cardData);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Delete saved card
  async deleteSavedCard(cardId) {
    try {
      const response = await userAPI.deleteSavedCard(cardId);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Get membership info
  async getMembership() {
    try {
      const response = await userAPI.getMembership();
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Upgrade to premium
  async upgradeToPremium(paymentData) {
    try {
      const response = await userAPI.upgradeToPremium(paymentData);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Upload avatar
  async uploadAvatar(formData) {
    try {
      const response = await userAPI.uploadAvatar(formData);
      const user = response.data;
      
      this.setUser(user);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await userAPI.verifyEmail(token);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Verify phone
  async verifyPhone(token) {
    try {
      const response = await userAPI.verifyPhone(token);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Resend email verification
  async resendEmailVerification() {
    try {
      const response = await userAPI.resendEmailVerification();
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Resend phone verification
  async resendPhoneVerification() {
    try {
      const response = await userAPI.resendPhoneVerification();
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Change password
  async changePassword(passwords) {
    try {
      const response = await userAPI.changePassword(passwords);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await authAPI.forgotPassword(email);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Reset password
  async resetPassword(token, password) {
    try {
      const response = await authAPI.resetPassword(token, password);
      return handleAPISuccess(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  // Refresh token (if implemented)
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // This endpoint would need to be implemented in the backend
      const response = await authAPI.refreshToken(refreshToken);
      const { token, user } = response.data;
      
      this.setToken(token);
      this.setUser(user);
      
      return handleAPISuccess(response);
    } catch (error) {
      this.logout();
      return handleAPIError(error);
    }
  }

  // Validate token
  validateToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      return {
        valid: payload.exp > currentTime,
        payload,
        expiresIn: payload.exp - currentTime,
      };
    } catch (error) {
      return {
        valid: false,
        payload: null,
        expiresIn: 0,
      };
    }
  }

  // Get token expiration time
  getTokenExpiration() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      return null;
    }
  }

  // Check if token will expire soon (within 5 minutes)
  isTokenExpiringSoon() {
    const expiration = this.getTokenExpiration();
    if (!expiration) return false;

    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    return expiration.getTime() - Date.now() < fiveMinutes;
  }

  // Auto refresh token if expiring soon
  async autoRefreshToken() {
    if (this.isTokenExpiringSoon()) {
      return await this.refreshToken();
    }
    return { success: true };
  }

  // Get user role
  getUserRole() {
    const user = this.getUser();
    return user?.role || 'user';
  }

  // Check if user is admin
  isAdmin() {
    return this.getUserRole() === 'admin';
  }

  // Get user permissions (if implemented)
  getUserPermissions() {
    const user = this.getUser();
    return user?.permissions || [];
  }

  // Check if user has specific permission
  hasPermission(permission) {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }

  // Clear all auth data
  clearAuthData() {
    this.removeToken();
    this.removeUser();
    this.removeRefreshToken();
  }

  // Initialize auth state (check token validity on app start)
  async initializeAuth() {
    if (!this.isAuthenticated()) {
      return { authenticated: false };
    }

    try {
      // Optionally fetch fresh user data
      const result = await this.getCurrentUser();
      return {
        authenticated: true,
        user: this.getUser(),
        success: result.success,
      };
    } catch (error) {
      this.logout();
      return { authenticated: false, error };
    }
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService; 