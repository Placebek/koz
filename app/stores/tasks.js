import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useTasksStore = defineStore('tasks', {
	state: () => ({
		tasks: [],
		error: null,
		loading: false,
	}),
	
	actions: {
		handleError(error) {
			if (error.response) {
				this.error = error.response.data.message || 'Ошибка при авторизации'
			} else {
				this.error = 'Произошла ошибка, повторите позднее'
			}
			return { success: false, error: this.error }
		},

		async createTask(data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.post('/tasks/new', data)
				this.tasks.tasks = [...this.tasks.tasks, response.data]
				debugger
				return { success: true }
				
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getAllTasks(tasks_id) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.get(`/tasks/all/${tasks_id}`)
				this.tasks = response.data
				return response.data
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getTaskById(task_id) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.get(`/tasks/${task_id}`)
				return response.data
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async updateTask(data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.put(`/tasks/edit`, data)
				this.tasks.tasks = this.tasks.tasks.map(task =>
					task.id === data.id ? response.data : task
				)
				return { success: true }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async deleteTask(task_id) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				await $api.delete(`/tasks/delete/`, {
					params: {
						task_id: task_id
					},
				})
				this.tasks.tasks = this.tasks.tasks.filter(
					s => s.id !== task_id
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
