<template>
	<UModal
		:open="open"
		title="Бөлмені бастау"
		@update:open="$emit('update:open', $event)"
		class="max-w-md"
	>
		<template #content>
			<div class="p-6 flex flex-col gap-4">
				<div>
					<label for="duration" class="block text-gray-700 font-medium mb-2">
						Ұзақтығы (минут):
					</label>
					<UInput
						v-model="duration"
						type="number"
						min="1"
						placeholder="Ұзақтықты енгізіңіз"
						class="w-full"
					/>
				</div>
				<div class="flex gap-4">
					<UButton
						@click="startRoom"
						color="blue"
						variant="solid"
						class="flex-1 rounded-lg"
						:disabled="isStarting"
					>
						{{ isStarting ? 'Басталуда...' : 'Растау' }}
					</UButton>
					<UButton
						@click="$emit('update:open', false)"
						color="gray"
						variant="outline"
						class="flex-1 rounded-lg"
					>
						Болдырмау
					</UButton>
				</div>
			</div>
		</template>
	</UModal>
</template>

<script setup>
const props = defineProps({
	open: Boolean,
	roomId: {
		type: [Number, String],
		required: true,
	},
	taskId: {
		type: [Number, String],
		required: true,
	},
  token: String,
})

const emit = defineEmits(['update:open'])

const duration = ref(0)
const isStarting = ref(false)
const accessToken = ref('')

async function startRoom() {
	isStarting.value = true
	const data = {
		room_id: Number(props.roomId),
		duration: Number(duration.value),
		task_id: Number(props.taskId),
	}

	try {
		const { $api } = useNuxtApp()
		await $api.post('/tasks_ws/broadcast', data, {
			headers: { Authorization: `Bearer ${accessToken.value}` },
		})
		await $api.post(`/tasks_ws/start/schedule-task/${props.roomId}`, null, {
			headers: { Authorization: `Bearer ${accessToken.value}` },
		})
		emit('update:open', false)
		emit('start')
	} catch (error) {
		console.error('Ошибка при старте комнаты:', error)
	} finally {
		isStarting.value = false
	}
}


</script>
