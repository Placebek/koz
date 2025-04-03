<template>
	<UModal :open="open" @update:open="$emit('update:open', $event)">
		<template #content>
			<div class="p-4">
				<h2 class="text-lg font-bold">{{ title }}</h2>
				<p class="mt-2">{{ content }}</p>

				<UButton label="Закрыть" @click="$emit('update:open', false)" class="mt-4" />
				<UButton label="Подтвердить" @click="$emit('update:open', false)" class="mt-4" />
			</div>
		</template>
	</UModal>
</template>

<script setup>
defineProps({
	open: Boolean,
	title: String,
	content: String,
});
defineEmits(["update:open"]);


</script>
