<template>
	<div class="lg:ml-[250px] lg:mr-[100px] pt-[100px] flex flex-col">
		<div class="flex justify-end mb-5">
			<div
				class="rounded-lg border border-sky-400 bg-[#A6E3E9] size-[50px] flex justify-center items-center text-blue-400 cursor-pointer hover:bg-[#8adde4]"
			>
				<Icon name="gridicons:plus" size="30" @click="openModalCreate()"/>
			</div>
		</div>
		<div
			class="w-full flex flex-row bg-[#A6E3E9] border-2 rounded-t-lg border-sky-400 text-white font-semibold text-xl h-[7vh]"
		>
			<div
				class="border-r border-sky-400 flex justify-center items-center w-[30%]"
			>
				ID
			</div>
			<div class="flex justify-center items-center w-[70%]">Пән аты</div>
		</div>

		<div v-if="subjectsStore.loading" class="text-center py-4 text-green-700">
			ЩААА...
		</div>

		<div
			v-for="subject in subjectsStore.subjects.subjects"
			:key="subject.id"
			class="w-full flex flex-row bg-[#A6E3E9] border-x-2 border-b-2 h-[5vh] border-sky-400 text-black"
		>
			<TableForm :data="subject" />
		</div>
<!-- 
		<div
			v-if="subjectsStore.subjects.subjects.length === 0"
			class="w-full bg-[#A6E3E9] h-[5vh] border-sky-400 text-black border-x-2 border-b-2 text-center flex justify-center items-center italic font-semibold"
		>
			Әзірге ештеңе жоқ
		</div> -->
		<div v-if="subjectsStore.error" class="text-red-500 text-center py-4">
			{{ subjectsStore.error }}
		</div>

		<CreateSubjectTableModal v-model:open="isOpen" />
	</div>
</template>

<script setup>
import { useSubjectsStore } from '#imports'
import { onMounted } from 'vue'
import CreateSubjectTableModal from '~/components/CreateSubjectTableModal.vue'

const isOpen = ref(false);

function openModalCreate() {
	isOpen.value = true;
}

const subjectsStore = useSubjectsStore()
onMounted(async () => {
	await subjectsStore.getAllSubjects()
})
</script>
