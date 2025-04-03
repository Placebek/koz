import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
	const config = useRuntimeConfig()

	const api = axios.create({
		baseURL: config.public.apiBase || 'http://192.168.152.118:8000',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	api.interceptors.request.use(
		config => {
			const token = localStorage.getItem('access_token')
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`
			}
			return config
		},
		error => Promise.reject(error)
	)

	return {
		provide: {
			api
		},
	}
})
