import api from './axios';

export const sendTestSMS = async (to: string, message: string) => {
  try {
    const response = await api.post('/test/sms', { to, message });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};