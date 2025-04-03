// stores/counter.js
import { defineStore } from 'pinia'

export const useSidebarActiveStore = defineStore('sidebarActive', {
	state: () => {
		return { active: 1 }
	},

	actions: {
		changeActive(number) {
			this.active = number
		},
		currentId() {
			return this.active
		},
	},

	getters: {},
})
