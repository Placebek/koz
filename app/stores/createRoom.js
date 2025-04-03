import { defineStore } from 'pinia'

export default useCreateRoomStore = defineStore('createRoom', {
	action: {
		addTask() {
			this.form.tasks.push({ name: '', file: null, preview: null })
		},
		removeTask(index) {
			if (this.form.tasks.length > 1) {
				if (this.form.tasks[index].preview) {
					URL.revokeObjectURL(this.form.tasks[index].preview)
				}
				this.form.tasks.splice(index, 1)
			}
		},
		handleFileChange(event, index) {
			const file = event.target.files[0]
			if (file && file.type === 'image/png') {
				if (this.form.tasks[index].preview) {
					URL.revokeObjectURL(this.form.tasks[index].preview)
				}
				this.form.tasks[index].file = file
				this.form.tasks[index].preview = URL.createObjectURL(file)
			} else {
				alert('Пожалуйста, выберите файл в формате PNG')
				event.target.value = ''
			}
		},
		async submitForm() {
			const formData = new FormData()

			formData.append('name_room', this.form.name_room)
			formData.append('max_clients', this.form.max_clients)

			this.form.tasks.forEach((task, index) => {
				formData.append(`tasks[${index}][name]`, task.name)
				if (task.file) {
					formData.append(`tasks[${index}][file]`, task.file)
				}
			})

			try {
				const response = await createRoom(formData, this.$api)
				console.log('Комната создана:', response)

				this.form.tasks.forEach(task => {
					if (task.preview) {
						URL.revokeObjectURL(task.preview)
					}
				})

				this.router.push('/')
			} catch (error) {
				alert(
					'Ошибка при создании комнаты: ' +
						(error.response?.data?.message || error.message)
				)
			}
		},
	},
})
