import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useAssignmentsStore = defineStore('assignments', {
    state: () => ({
        assignments: [],
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

       

        async getAllAssignmentsByRoomId(room_id) {
            const { $api } = useNuxtApp()
            try {
                this.loading = true
                this.error = null
                const response = await $api.get(
									`/assignments/all/?room_id=${room_id}`
								)
                this.assignments = response.data
                return response.data
            } catch (error) {
                return this.handleError(error)
            } finally {
                this.loading = false
            }
        },

        async getAssignmentById(assignment_id) {
            const { $api } = useNuxtApp()
            try {
                this.loading = true
                this.error = null
                const response = await $api.get(`/assignments/${assignment_id}`)
                return response.data
            } catch (error) {
                return this.handleError(error)
            } finally {
                this.loading = false
            }
        },

        
    },
})
