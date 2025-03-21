import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Asegúrate de que Vite escuche en todas las interfaces de red
    port: process.env.PORT || 3000,  // Usa el puerto proporcionado por Render o 3000 si no está definido
    allowedHosts: ['productos-consumoapi.onrender.com'],  // Permite el dominio de Render
  },
});
