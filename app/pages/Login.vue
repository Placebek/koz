<template>
  <div class="pt-[20vh]  flex items-center justify-center bg-[#E3FDFD] flex-col">
    
    <div class="bg-[#A6E3E9] p-8 rounded-lg shadow-lg w-full max-w-md relative">
      <div class="absolute left-3 top-3">
       <button
        @click="$router.push('/')"
        class="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
      >
        <svg
          class="w-6 h-6 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Назад
      </button>
    </div>
      <h1 class="text-3xl text-gray-800 font-semibold mb-6 text-center">Вход</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="username" class="block text-gray-700 mb-1">Имя пользователя</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Введите имя"
            class="w-full px-4 py-2 bg-[#E3FDFD]  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 mb-1">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            class="w-full px-4 py-2 bg-[#E3FDFD]  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-[#71C9CE] text-white rounded hover:bg-gray-700 transition-colors"
        >
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from '#app';
import { useSidebarActiveStore } from '#imports';


export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {
        localStorage.setItem('access_token', 'test-token-' + this.username);
        this.router.push('/');
      } else {
        alert('Пожалуйста, заполните все поля');
      }
    },
  },
};
</script>
