<template>
	<div class="min-h-screen w-full pl-[250px] pr-[100px] bg-[#E3FDFD] flex">
		<div class="flex-1 p-8">
			<div class="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-6">
				<h1
					class="text-2xl font-semibold text-gray-900 flex items-center gap-2"
				>
					<Icon name="mdi:room-service" size="24" class="text-blue-600" />
					Админ панелі: Бөлме {{ roomId }}
				</h1>

				<div class="flex flex-col gap-2">
					<h2 class="text-lg font-medium text-gray-800">
						Қосылған студенттер:
					</h2>
					<div v-if="clients.length === 0" class="text-gray-500 italic">
						Әзірге ешкім қосылмады...
					</div>
					<div
						v-for="client in clients"
						:key="client.id"
						class="flex items-center gap-2 p-2 text-gray-800"
					>
						<span>Клиент {{ client.username }}</span>
					</div>
				</div>

				<div
					class="text-center py-2 px-4 rounded-lg border"
					:class="
						connected
							? 'text-green-600 border-green-200'
							: 'text-red-600 border-red-200'
					"
				>
					<span class="font-medium">{{
						connected ? 'WebSocket қосылды' : 'WebSocket ажыратылды'
					}}</span>
				</div>

				<div class="flex gap-4 justify-center">
					<UButton
						@click="openStartModal"
						color="blue"
						variant="solid"
						size="md"
						class="px-6 py-2 rounded-lg"
						:disabled="isStarting || !connected"
					>
						Бастау
					</UButton>
					<UButton
						@click="finishRoom"
						color="red"
						variant="solid"
						size="md"
						class="px-6 py-2 rounded-lg text-black"
						:disabled="isFinishing"
					>
						{{ isFinishing ? 'Аяқталуда...' : 'Аяқтау' }}
					</UButton>
				</div>
			</div>

			<StartRoomModal
				v-model:open="showStartModal"
				:room-id="roomId"
				:task-id="taskId"
                :token="accessToken"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRoomsStore } from '#imports'

const route = useRoute()
const router = useRouter()
const roomsStore = useRoomsStore()

// Данные комнаты
const roomId = ref(route.params.roomId)
const taskId = ref(route.query.taskId || 1)
const clients = ref([])
const connected = ref(false)
const isFinishing = ref(false)
const isStarting = ref(false)
const accessToken = ref('')
let websocket = null

// Подключение к WebSocket
function connectWebSocket() {
	const wsUrl = `ws://192.168.152.118:8000/tasks_ws/ws?room_id=${roomId.value}&access_token=${accessToken.value}`
	console.log(`Попытка подключения к ${wsUrl}`)

	websocket = new WebSocket(wsUrl)

	websocket.onopen = () => {
		console.log(`WebSocket подключен для комнаты ${roomId.value}`)
		connected.value = true
	}

	websocket.onmessage = event => {
		try {
			const data = JSON.parse(event.data)
			console.log('Получены данные:', data)
			clients.value = [...clients.value, data]
		} catch (error) {
			console.log('Получено текстовое сообщение:', event.data)
		}
	}

	websocket.onclose = event => {
		console.log(`WebSocket отключен для комнаты ${roomId.value}`, event)
		connected.value = false
	}

	websocket.onerror = error => {
		console.error('WebSocket ошибка:', error)
		connected.value = false
	}
}


const showStartModal = ref(false)
function openStartModal() {
	showStartModal.value = true
}

function onRoomStarted() {
	console.log('Комната успешно запущена')
}

// Завершение комнаты
async function finishRoom() {
	isFinishing.value = true
	try {
		const { $api } = useNuxtApp()
		// Если эндпоинт для остановки будет активен, раскомментируйте
		// await $api.post(`/tasks_ws/stop/schedule-task/${roomId.value}`, {
		//   headers: { Authorization: `Bearer ${accessToken.value}` },
		// })
	} catch (error) {
		console.error('Ошибка при завершении комнаты:', error)
	} finally {
		if (websocket) websocket.close()
		router.push('/')
		isFinishing.value = false
	}
}

onMounted(() => {
	if (import.meta.client) {
		accessToken.value = localStorage.getItem('access_token') || ''
		if (!accessToken.value) {
			console.error('Токен отсутствует, перенаправление на страницу логина')
			router.push('/login')
			return
		}
		connectWebSocket()
	}
})

onUnmounted(() => {
	if (websocket) websocket.close()
})
</script>
