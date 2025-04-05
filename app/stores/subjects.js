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
				console.log(response)
				this.subjects.subjects = [...this.subjects.subjects, response.data]
				return { success: true }
				
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

		async updateSubject(data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.put(`/subjects/edit`, data)
				this.subjects.subjects = this.subjects.subjects.map(subject =>
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
				await $api.delete(`/subjects/delete/`, {
					params: {
						subject_id: subject_id
					},
				})
				this.subjects.subjects = this.subjects.subjects.filter(
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
