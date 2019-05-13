const axios = require('axios');
const log = require('../logger')(__filename);

class API {
  constructor(options = {}) {
    this.client = axios.create();
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        if (!this.token) {
          return config;
        }

        const newConfig = {
          headers: {},
          ...config,
        };

        newConfig.headers.Authorization = `Bearer ${this.token}`;
        return newConfig;
      },
      e => Promise.reject(e),
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
        if (!this.refreshToken || error.response.status !== 401 || error.config.retry) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post('http://localhost:3000/api/v1/refresh', {
            refreshToken: this.refreshToken,
          });
        }
        const { data } = await this.refreshRequest;
        this.token = data.tokens.token;
        this.refreshToken = data.tokens.generatedToken;

        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      },
    );
  }

  async login(userEmail, password) {
    const REQUEST_BODY = {
      email: userEmail,
      userPassword: password,
    };
    try {
      const { data } = await this.client.post('http://localhost:3000/api/v1/login', REQUEST_BODY);
      this.token = data.tokens.token;
      this.refreshToken = data.tokens.generatedToken;
      return true;
    } catch (error) {
      log.error(error, 'Login failed to API. No user found. Wrong creds');
      return false;
    }
  }

  async register(userEmail, password) {
    const REQUEST_BODY = {
      email: userEmail,
      userPassword: password,
    };
    try {
      const { data } = await this.client.post(
        'http://localhost:3000/api/v1/register',
        REQUEST_BODY,
      );
      this.token = data.tokens.token;
      this.refreshToken = data.tokens.generatedToken;
      return true;
    } catch (error) {
      log.error(error, 'FAILED TO REGISTER INTO API.');
      return false;
    }
  }

  async getNews() {
    if (!this.token && !this.refreshToken) {
      return false;
    }
    return this.client.get('http://localhost:3000/api/v1/news').then(({ data }) => data);
  }

  async logout() {
    try {
      await this.client.post('http://localhost:3000/api/v1/logout');
      this.token = null;
      this.refreshToken = null;
      return true;
    } catch (error) {
      log.error(error, 'Failed to logout');
      return false;
    }
  }
}

module.exports = new API();
