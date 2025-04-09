import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useRoomsStore = defineStore('rooms', {
	state: () => ({
		rooms: [],
        
		error: null,
		loading: false,
	}),

	actions: {
		handleError(error) {
			if (error.response) {
				this.error =
					error.response.data.message || 'Ошибка при создании комнаты'
			} else {
				this.error = 'Произошла ошибка, повторите позже'
			}
			return { success: false, error: this.error }
		},

		async createRoom(data) {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.post('/rooms/new', data)
				this.rooms = [...this.rooms, response.data]
				return { success: true, room: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},

		async getAllRooms() {
			const { $api } = useNuxtApp()
			try {
				this.loading = true
				this.error = null
				const response = await $api.get('/rooms/all') 
				this.rooms = response.data
				return { success: true, rooms: response.data }
			} catch (error) {
				return this.handleError(error)
			} finally {
				this.loading = false
			}
		},
	},
})
