import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
	const config = useRuntimeConfig()

	const api = axios.create({
		baseURL: config.public.apiBaseUrl,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const getAuthToken = () => {
		return localStorage.getItem('access_token')
	}

	api.interceptors.request.use(
		config => {
			const token = getAuthToken()
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`
			}
			return config
		},
		error => Promise.reject(error)
	)

	nuxtApp.provide('api', api)
})
