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
						id=""
						:value="title"
						class="border-2 rounded-2xl p-2 w-full mt-3 border-white focus-visible:outline-0"
					/>
				</div>

				<UButton
					label="Подтвердить"
					@click="$emit('update:open', false)"
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
	content: String,
})
defineEmits(['update:open'])
</script>
