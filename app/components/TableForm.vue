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
			@click="openModalChange(data.name, data.id)"
		/>
	</div>
	<div class="w-[5%] flex justify-center items-center">
		<Icon
			name="material-symbols:delete"
			size="25"
			class="text-red-400 cursor-pointer hover:text-red-500"
			@click="openModalDelete(data.name, data.id)"
		/>
	</div>

	<ChangeTableModal v-model:open="isOpenChange" :title="modalTitle" :idTable="idTable"/>
	<DeleteTableModal v-model:open="isOpenDelete" :title="modalTitle" :idTable="idTable"/>

</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
	data: Object,
});

const isOpenChange = ref(false);
const isOpenDelete = ref(false);
const idTable = ref(0)
const modalTitle = ref("");

function openModalChange(title, id) {
	modalTitle.value = title;
	idTable.value = id
	isOpenChange.value = true;
}

function openModalDelete(title, id) {
	modalTitle.value = title;
	idTable.value = id
	isOpenDelete.value = true;

}
</script>
