<template>
	<UModal
		:open="open"
		@update:open="$emit('update:open', $event)"
		class="lg:max-w-[25vw] lg:min-h-[20vh]"
	>
		<template #content>
			<div class="p-4">
				<h2>Өшірместен бұрын жақсылап ойланыңыз...</h2>
				<div class="p-3 border-2 mt-3 border-white focus-visible:outline-0">
					{{ title }}
				</div>

				<UButton loading-auto label="Өшіру" @click="deleteTable(idTable)" class="mt-4" />
				<UButton
					label="Жоқ, өшіруге қимаймын"
					@click="$emit('update:open', false)"
					class="mt-4 ml-4"
					color="error"
				/>
			</div>
		</template>
	</UModal>
</template>

<script setup>
import { useSubjectsStore } from '#imports'

async function deleteTable(id) {
	new Promise(res => setTimeout(res, 1000))
	const response = await useSubjectsStore().deleteSubject(id)
	if (response) {
		return $emit('update:open', false)
	} else {
	}
}
defineProps({
	open: Boolean,
	title: String,
	idTable: Number
})

defineEmits(['update:open'])
</script>
