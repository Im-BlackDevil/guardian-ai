// API Configuration
export const API_CONFIG = {
  BACKEND_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-backend.com' 
    : 'http://localhost:3001',
  FRONTEND_URL: process.env.NODE_ENV === 'production'
    ? 'https://your-production-frontend.com'
    : 'http://localhost:8081',
  ENDPOINTS: {
    GUARDIAN: {
      CHECK_ACTION: '/guardian/check-action',
      LOGS: '/guardian/logs',
      STATS: '/guardian/stats'
    },
    BIAS_SHIELD: {
      GENERATE_PDF: '/api/generate-bias-free',
      HEALTH: '/api/health'
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
};
