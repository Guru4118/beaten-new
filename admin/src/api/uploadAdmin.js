import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const uploadAdminAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axios.post(`${API_BASE_URL}/upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 