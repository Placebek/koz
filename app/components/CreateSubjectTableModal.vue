<template>
	<UModal
		:open="open"
		@update:open="$emit('update:open', $event)"
		class="lg:max-w-[25vw] lg:min-h-[20vh]"
	>
		<template #content>
			<div class="p-4">
				<h2>
                    Пән енгізу
                </h2>
				
                <div>
					<input
						type="text"
						name="title"
						id="title"
						class="border-2 rounded-2xl p-2 w-full mt-3 border-white focus-visible:outline-0"
					/>
				</div>
				<UButton
					loading-auto
					label="Растау"
					@click="createTable()"
					class="mt-4"
				/>
				<UButton
					label="Жоқ, енгізгім келмей қалды"
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

async function createTable() {
	const value = document.getElementById('title').value
	if (value) {
		new Promise(res => setTimeout(res, 1000))
		const response = await useSubjectsStore().createSubject({name: value})
		if (response['success']) {
			return $emit('update:open', false)
		} else {

		}
	}
	else{

	} 
}
defineProps({
	open: Boolean,
})

defineEmits(['update:open'])
</script>
