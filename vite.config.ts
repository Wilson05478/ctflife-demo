import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/users': {
            target: 'https://ctflife-demo.zeabur.app',
            changeOrigin: true,
            secure: false,
          },
          '/student': {
            target: 'https://ctflife-demo.zeabur.app',
            changeOrigin: true,
            secure: false,
          },
          '/auth': {
            target: 'https://ctflife-demo.zeabur.app',
            changeOrigin: true,
            secure: false,
          },
          '/course_content': {
            target: 'https://ctflife-demo.zeabur.app',
            changeOrigin: true,
            secure: false,
          },
        }
      },
      plugins: [react(),tailwindcss()],
      base: process.env.VITE_BASE_PATH || '/ctfLife',
      build: {
        rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
