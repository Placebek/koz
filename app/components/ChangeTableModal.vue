<template>
	<UModal
		:open="open"
		@update:open="$emit('update:open', $event)"
		class="lg:max-w-[25vw] lg:min-h-[20vh]"
	>
		<template #content>
			<div class="p-4">
				<h2>Қандай атқа өзгертесіз?</h2>
				<div>
					<input
						type="text"
						name=""
						id="changeTitle"
						:value="title"
						class="border-2 rounded-2xl p-2 w-full mt-3 border-white focus-visible:outline-0"
					/>
				</div>

				<UButton
					label="Подтвердить"
					@click="changeTable(idTable)"
					class="mt-4 "
				/>
				<UButton
					label="Закрыть"
					@click="$emit('update:open', false)"
					class="mt-4 ml-4 "
					color="error"
					
				/>
			</div>
		</template>
	</UModal>
</template>

<script setup>
defineProps({
	open: Boolean,
	title: String,
	idTable: Number,
})

async function changeTable(id) {
	const value = document.getElementById('changeTitle').value
	new Promise(res => setTimeout(res, 1000))
	const response = await useSubjectsStore().updateSubject({id: id, name: value})
	debugger
	if (response) {
		return $emit('update:open', false)
	} else {
	}
}

defineEmits(['update:open'])
</script>
