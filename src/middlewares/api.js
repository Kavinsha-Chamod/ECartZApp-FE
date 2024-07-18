import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.0.2.2:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const sendOtp = async (email,name) => {
  try {
    const response = await api.post('/users/send-otp', { email,name });  
    return response.data;
  }
  catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message);
    }
  }
}

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/users/verify-otp', { email, otp });
    return response.data;
  }
  catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message);
    }
  }
}

export const sendResetOtp = async (email) => {
  try {
    const response = await api.post('/users/send-reset-otp', { email });
    return response.data;
  }
  catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message);
    }
  }
}

export const resetOtp = async (email, otp, password) => {
  try {
    const response = await api.post('/users/verify-reset-otp', { email, otp, password });
    return response.data;
  }
  catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message);
    }
  }
}

export const updatePassword = async (email, password) => {
  try {
    const response = await api.post('/users/update-password', { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message);
    }
  }
}

export const signup = async (userData) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message);
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    const { token } = response.data;

    if (!token) {
      throw new Error('No token found in response');
    }
    await AsyncStorage.setItem('userToken', token);
    return token;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error(error.message || 'Something went wrong');
    }
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Failed to logout user:', error);
  }
};

export default api;
