<!-- Тақырыптар -->

<template>
	<div class="lg:ml-[250px] lg:mr-[100px] pt-[50px] flex flex-col">
		<div class="flex justify-between items-center mb-5">
			<div class="flex flex-col">
				<h2 class="text-black font-semibold">Пән аты:</h2>
				<UInputMenu
					v-model="subjectValue"
					:items="subjectItems"
					color="neutral"
					@focus="openInputMenu = true"
					style="background: #508aff"
					v-on:change="topicsGet()"
				/>
			</div>
			<div
				class="rounded-lg border border-sky-400 bg-[#A6E3E9] size-[50px] flex justify-center items-center text-blue-400 cursor-pointer hover:bg-[#8adde4]"
			>
				<Icon name="gridicons:plus" size="30" @click="openModalCreate()" />
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
			<div class="flex justify-center items-center w-[70%]">Тақырыптар аты</div>
		</div>

		<div v-if="topicsStore.loading" class="text-center py-4 text-green-700">
			ЩААА...
		</div>

		<div
			v-for="topic in currentTopics"
			:key="topic.id"
			class="w-full flex flex-row bg-[#A6E3E9] border-x-2 border-b-2 h-[5vh] border-sky-400 text-black"
		>
			<TableForm :data="topic" />
		</div>

		<div
			v-if="countTopics === 0"
			class="w-full bg-[#A6E3E9] h-[5vh] border-sky-400 text-black border-x-2 border-b-2 text-center flex justify-center items-center italic font-semibold"
		>
			Әзірге ештеңе жоқ
		</div>
		<div v-if="topicsStore.error" class="text-red-500 text-center py-4">
			{{ topicsStore.error }}
		</div>

		<CreateTopicsTableModal v-model:open="isOpen" />
		<div class="flex justify-center items-center mt-5">
			<UPagination
				v-model:page="page"
				:items-per-page="10"
				:total="countTopics"
				color="primary"
				@click="update"
			/>
		</div>
	</div>
</template>

<!-- Тақырыптар -->
<script setup>
import { useTopicsStore } from '#imports'
import { useSubjectsStore } from '#imports'
import { onMounted } from 'vue'
import CreateTopicsTableModal from '~/components/CreateTasksTableModal.vue'

const page = ref(1)
const openInputMenu = ref(false)
const currentTopics = ref([])
const countTopics = ref(0)
const allSubjects = ref([])
const subjectId = ref(0)
const subjectItems = ref([])
const subjectValue = ref('')



function update() {
	let a = (page.value - 1) * 10
	let b = (page.value - 1) * 10 + 10
	currentTopics.value = topicsStore.topics.topics.slice(a, b)
}

async function topicsGet(){

	subjectId.value = allSubjects.value.filter(item=> [subjectValue.value].includes(item['name'])).map((item)=> item['id'] )
	await topicsStore.getAllTopics(subjectId.value)
	countTopics.value = topicsStore.topics.topics.length
	if (countTopics.value > 10) {
		currentTopics.value = topicsStore.topics.topics.slice(0, 10)
	}
	else {
		currentTopics.value = topicsStore.topics.topics
	}
}

const isOpen = ref(false)
function openModalCreate() {
	isOpen.value = true
}


const topicsStore = useTopicsStore()
const subjectsStore = useSubjectsStore()


onMounted(async () => {
	const sidebar = useSidebarActiveStore()
	sidebar.changeActive(3)

	await subjectsStore.getAllSubjects()
	allSubjects.value = subjectsStore.subjects.subjects
	subjectItems.value = subjectsStore.subjects.subjects.map(item => item['name'])
	subjectValue.value = subjectItems.value[0]
	await topicsGet()
})
</script>
