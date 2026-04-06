import axios from 'axios';
import { getApiKey, getApiUrl } from './config.js';

class SepterionalAPI {
  constructor() {
    this.baseURL = getApiUrl();
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add API key to every request
    this.client.interceptors.request.use((config) => {
      const apiKey = getApiKey();
      if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`;
      }
      return config;
    });
  }

  async createCogit(data) {
    const response = await this.client.post('/api/cogits', data);
    return response.data;
  }

  async listCogits(params = {}) {
    const response = await this.client.get('/api/cogits', { params });
    return response.data;
  }

  async getCogit(username, slug) {
    const response = await this.client.get(`/api/cogits/${username}/${slug}`);
    return response.data;
  }

  async search(query) {
    const response = await this.client.get('/api/search', {
      params: { q: query },
    });
    return response.data;
  }

  async getTrendingTags() {
    const response = await this.client.get('/api/search/tags/trending');
    return response.data;
  }

  async addEntry(cogitId, entryData) {
    const response = await this.client.post(`/api/cogits/${cogitId}/entries`, entryData);
    return response.data;
  }
}

export default new SepterionalAPI();
