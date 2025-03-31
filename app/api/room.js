export const createRoom = async (formData, api) => {
	try {
		const response = await api.post('/user/create/room', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	} catch (error) {
		console.error('Ошибка при создании комнаты:', error)
		throw error
	}
}

export const getRooms = async api => {
	try {
		const response = await api.get('/rooms')
		return response.data
	} catch (error) {
		console.error('Ошибка при получении комнат:', error)
		throw error
	}
}

export const deleteRoom = async (roomId, api) => {
	try {
		const response = await api.delete(`/rooms/${roomId}`)
		return response.data
	} catch (error) {
		console.error('Ошибка при удалении комнаты:', error)
		throw error
	}
}
