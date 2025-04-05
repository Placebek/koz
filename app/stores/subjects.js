import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useSubjectsStore = defineStore('subjects', {
	state: () => ({
		subjects: [],
		error: null,
		loading: false,
	}),

	actions: {
		handleError(error) {
			console.error('Ошибка запроса:', error)
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
				const response = await $api.post('/subjects/new', data)
				this.subjects = [...this.subjects, response.data]
				return response.data
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getAllSubjects() {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.get('/subjects/all')
				this.subjects = response.data
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
				const response = await $api.get(`/subjects/${subject_id}`)
				return response.data
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async updateSubject(subject_id, data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.put(`/subjects/${subject_id}`, data)

				this.subjects = this.subjects.map(subject =>
					subject.id === subject_id ? response.data : subject
				)

				return response.data
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
				await $api.delete(`/subjects/delete/`, {
					params: {
						subject_id: subject_id
					},
				})
				this.subjects = this.subjects.filter(s => s.id !== subject_id)
				return { success: true }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},
	},
})
