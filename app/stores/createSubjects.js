import { defineStore } from 'pinia'

export default createSubjects = defineStore('creteSubject', {
	actions: {
		async createSubject(data) {
			try {
				const response = await $api.post(`/subjects/new`, data)
				return response.data
			} catch (error) {
				if (error.response) {
					this.error = error.response.data.message || 'Ошибка при авторизации'
				} else {
					this.error = 'Произошла ошибка, повторите позднее'
				}
				return { success: false, error: this.error }
			}
		},
		async getAllSubjects() {
			try {
				const response = await $api.get(`/subjects/all`)
				return response.data
			} catch (error) {
				if (error.response) {
					this.error = error.response.data.message || 'Ошибка при авторизации'
				} else {
					this.error = 'Произошла ошибка, повторите позднее'
				}
				return { success: false, error: this.error }
			}
		},
		async getSubjectById(subject_id) {
			try {
				const response = await $api.get(`/subjects/${subject_id}`)
				return response.data
			} catch (error) {
				if (error.response) {
					this.error = error.response.data.message || 'Ошибка при авторизации'
				} else {
					this.error = 'Произошла ошибка, повторите позднее'
				}
				return { success: false, error: this.error }
			}
		},

		async updateSubject(subject_id) {
			try {
				const response = await $api.put(`/subjects/`, {
					params: {
						subject_id: subject_id,
					},
				})
				return response.data
			} catch (error) {
				if (error.response) {
					this.error = error.response.data.message || 'Ошибка при авторизации'
				} else {
					this.error = 'Произошла ошибка, повторите позднее'
				}
				return { success: false, error: this.error }
			}
		},

		async deleteSubject(data) {
			try {
				const response = await $api.delete(`/subjects/delete`)
				return response.data
			} catch (error) {
				if (error.response) {
					this.error = error.response.data.message || 'Ошибка при авторизации'
				} else {
					this.error = 'Произошла ошибка, повторите позднее'
				}
				return { success: false, error: this.error }
			}
		},
	},
})
