<template>
  <div class="pt-[20vh] flex items-center justify-center bg-[#E3FDFD] flex-col">
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
            class="w-full px-4 py-2 bg-[#E3FDFD] rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 mb-1">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            class="w-full px-4 py-2 bg-[#E3FDFD] rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-[#71C9CE] text-white rounded hover:bg-gray-700 transition-colors"
          :disabled="loading"
        >
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
      <div v-if="error" class="mt-4 text-red-600 text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const router = useRouter()
const { $api } = useNuxtApp()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function login() {
  if (!username.value || !password.value) {
    error.value = 'Пожалуйста, заполните все поля'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await $api.post('/auth/user/login', {
      username: username.value,
      password: password.value,
    })

    localStorage.setItem('access_token', response.data.access_token)
    localStorage.setItem('access_token_type', response.data.access_token_type)
    localStorage.setItem('access_token_expire_time', response.data.access_token_expire_time)

    router.push('/')
  } catch (err) {
    console.error('Ошибка при входе:', err)
    error.value = err.response?.data?.detail || 'Ошибка при входе. Проверьте логин и пароль.'
  } finally {
    loading.value = false
  }
}
</script>