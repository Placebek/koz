<template>
	<div class="border-r flex justify-center items-center w-[30%] border-sky-400">
		{{ data.id }}
	</div>
	<div class="border-r border-sky-400 flex justify-center items-center w-[60%]">
		{{ data.name }}
	</div>
	<div class="w-[5%] flex justify-center items-center">
		<Icon
			name="mdi:pencil"
			size="25"
			class="text-green-400 shadow-xl cursor-pointer hover:text-green-500"
			@click="openModal(data.name)"
		/>
	</div>
	<div class="w-[5%] flex justify-center items-center">
		<Icon
			name="material-symbols:delete"
			size="25"
			class="text-red-400 cursor-pointer hover:text-red-500"
		/>
	</div>

	<ChangeTableModal v-model:open="isOpen" :title="modalTitle" :content="modalContent" />
</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
	data: Object,
});

const isOpen = ref(false);
const modalTitle = ref("");
const modalContent = ref("");

function openModal(title, content) {
	modalTitle.value = title;
	modalContent.value = content;
	isOpen.value = true;
}
</script>
