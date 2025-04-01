<template>
  
  <div class="min-h-screen w-full flex items-center justify-between bg-[#E3FDFD] px-40">
    


    <div
      class="text-gray-800 font-semibold text-2xl hover:text-gray-600 transition-colors cursor-pointer"
      @click="handleCreateRoom"
    >
      Создать комнату
    </div>

    <!-- Большой глаз в центре -->
    <svg class="w-full h-full max-w-2xl max-h-[90vh]" viewBox="0 0 200 200">
      <!-- Глазное яблоко -->
      <defs>
        <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color: #f5f5f5" />
          <stop offset="100%" style="stop-color: #d1d5db" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="#FFFFFF" stroke="#374151" stroke-width="4" />

      <!-- Радужка -->
      <defs>
        <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color: #9ca3af" />
          <stop offset="100%" style="stop-color: #4b5563" />
        </radialGradient>
      </defs>
      <circle id="iris" cx="100" cy="100" r="40" fill="url(#irisGradient)" />

      <!-- Зрачок -->
      <circle id="pupil" cx="100" cy="100" r="16" fill="#1f2937" style="transition: cx 0.2s ease-out, cy 0.2s ease-out;" />

      <!-- Блики -->
      <circle cx="120" cy="80" r="10" fill="rgba(255, 255, 255, 0.6)" />
      <circle cx="130" cy="70" r="4" fill="rgba(255, 255, 255, 0.3)" />
    </svg>

    <div
      class="text-gray-800 font-semibold text-2xl hover:text-gray-600 transition-colors cursor-pointer"
      @click="handleStats"
    >
      Статистика
    </div>
  </div>
</template>

<script>
import { useAuth } from '../utils/auth';

export default {
  mounted() {
    const pupil = document.getElementById('pupil'); 
    const iris = document.getElementById('iris');   
    window.addEventListener('mousemove', (event) => {
      const eyeRect = pupil.parentElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + 100; 
      const eyeCenterY = eyeRect.top + 100;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

      const pupilX = 100 + Math.cos(angle) * 40;
      const pupilY = 100 + Math.sin(angle) * 40;

      const irisX = 100 + Math.cos(angle) * 25;
      const irisY = 100 + Math.sin(angle) * 25;

      pupil.setAttribute('cx', pupilX);
      pupil.setAttribute('cy', pupilY);
      iris.setAttribute('cx', irisX);
      iris.setAttribute('cy', irisY);
    });
  },
  setup() {
    const { checkToken } = useAuth();

    const handleCreateRoom = () => checkToken('/create');
    const handleStats = () => checkToken('/stats');

    return {
      handleCreateRoom,
      handleStats,
    };
  },

};
</script>
