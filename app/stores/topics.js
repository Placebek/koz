import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useTopicsStore = defineStore('topics', {
	state: () => ({
		topics: [],
		error: null,
		loading: false,
	}),

	actions: {
		handleError(error) {
			// console.error('Ошибка запроса:', error)
			if (error.response) {
				this.error = error.response.data.message || 'Ошибка при авторизации'
			} else {
				this.error = 'Произошла ошибка, повторите позднее'
			}
			return { success: false, error: this.error }
		},

		async createSubject(data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.post('/topics/new', data)
				this.topics.topics = [...this.topics.topics, response.data]
				debugger
				return { success: true }
				
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getAllTopics() {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.get('/topics/all')
				this.topics = response.data
				return response.data
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getSubjectById(subject_id) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.get(`/topics/${subject_id}`)
				return response.data
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async updateSubject(data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.put(`/topics/edit`, data)
				this.topics.topics = this.topics.topics.map(subject =>
					subject.id === data.id ? response.data : subject
				)
				return { success: true }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async deleteSubject(subject_id) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				await $api.delete(`/topics/delete/`, {
					params: {
						subject_id: subject_id
					},
				})
				this.topics.topics = this.topics.topics.filter(
					s => s.id !== subject_id
				)
				return { success: true }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},
	},
})
