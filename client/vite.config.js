import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://postgresusermanagement-1.onrender.com', 
        changeOrigin: true,  
        secure: false,  
      },
    },
  },
});
