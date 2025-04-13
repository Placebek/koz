import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useroomsStore = defineStore('rooms', {
    state: () => ({
        rooms: [],
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


        async getAllRooms() {
            const { $api } = useNuxtApp()
            try {
                this.loading = true
                this.error = null
                const response = await $api.get('/rooms/all')
                this.rooms = response.data
                return response.data
            } catch (error) {
                return this.handleError(error)
            } finally {
                this.loading = false
            }
        },

        async getRoomById(room_id) {
            const { $api } = useNuxtApp()
            try {
                this.loading = true
                this.error = null
                const response = await $api.get(`/rooms/${room_id}`)
                return response.data
            } catch (error) {
                return this.handleError(error)
            } finally {
                this.loading = false
            }
        },
    },
})
