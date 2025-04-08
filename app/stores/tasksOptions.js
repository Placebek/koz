import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useTaskOptionsStore = defineStore('task_options', {
	state: () => ({
		task_options: [],
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

		async createTaskOption(data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.post('/task_options/new', data, {
					headers: {
						'Content-Type': 'multipart/form-data', 
					},
				})
				this.task_options.task_options = [...this.task_options.task_options, response.data]
				return { success: true }
			} catch (error) {
				this.error =
					error.response?.data?.detail || 'Ошибка при создании опции задачи'
				return { success: false }
			} finally {
				this.loading = false
			}
		},

		async getAllTaskOptions(tasks_id) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.get(`/task_options/all/${tasks_id}`)
				this.task_options = response.data
				return response.data
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		// async getTaskById(task_id) {
		//     const { $api } = useNuxtApp()
		//     try {
		//         this.loading = true
		//         this.error = null
		//         const response = await $api.get(`/tasks/${task_id}`)
		//         return response.data
		//     } catch (error) {
		//         return this.handleError(error)
		//     } finally {
		//         this.loading = false
		//     }
		// },

		// async updateTask(data) {
		//     const { $api } = useNuxtApp()
		//     try {
		//         this.loading = true
		//         this.error = null
		//         const response = await $api.put(`/tasks/edit`, data)
		//         this.tasks.tasks = this.tasks.tasks.map(task =>
		//             task.id === data.id ? response.data : task
		//         )
		//         return { success: true }
		//     } catch (error) {
		//         return this.handleError(error)
		//     } finally {
		//         this.loading = false
		//     }
		// },

		// async deleteTask(task_id) {
		//     const { $api } = useNuxtApp()
		//     try {
		//         this.loading = true
		//         this.error = null
		//         await $api.delete(`/tasks/delete/`, {
		//             params: {
		//                 task_id: task_id
		//             },
		//         })
		//         this.tasks.tasks = this.tasks.tasks.filter(
		//             s => s.id !== task_id
		//         )
		//         return { success: true }
		//     } catch (error) {
		//         return this.handleError(error)
		//     } finally {
		//         this.loading = false
		//     }
		// },
	},
})
