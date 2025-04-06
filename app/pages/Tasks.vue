<template>
	<div class="lg:ml-[250px] lg:mr-[100px] pt-[50px] flex flex-col">
		<div class="flex justify-between items-center mb-5">
			<div class="flex flex-row gap-2">
				<div class="flex flex-col">
					<h2 class="text-black font-semibold">Пән аты:</h2>
					<UInputMenu
						v-model="subjectValue"
						:items="subjectItems"
						color="neutral"
						@focus="openInputMenu = true"
						style="background: #508aff"
					/>
				</div>
				<div class="flex flex-col">
					<h2 class="text-black font-semibold">Тақырып аты:</h2>

					<UInputMenu
						v-model="topicsValue"
						:items="topicsItems"
						color="neutral"
						@focus="openInputMenu = true"
						style="background: #508aff; outline: none;"
					/>
				</div>
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
			<div class="flex justify-center items-center w-[70%]">аты</div>
		</div>

		<div v-if="tasksStore.loading" class="text-center py-4 text-green-700">
			ЩААА...
		</div>

		<div
			v-for="subject in currentTasks"
			:key="subject.id"
			class="w-full flex flex-row bg-[#A6E3E9] border-x-2 border-b-2 h-[5vh] border-sky-400 text-black"
		>
			<TableForm :data="subject" />
		</div>

		<div
			v-if="countSubject === 0"
			class="w-full bg-[#A6E3E9] h-[5vh] border-sky-400 text-black border-x-2 border-b-2 text-center flex justify-center items-center italic font-semibold"
		>
			Әзірге ештеңе жоқ
		</div>
		<div v-if="tasksStore.error" class="text-red-500 text-center py-4">
			{{ tasksStore.error }}
		</div>

		<CreateSubjectTableModal v-model:open="isOpen" />
		<div class="flex justify-center items-center mt-5">
			<UPagination
				v-model:page="page"
				:items-per-page="10"
				:total="countSubject"
				color="primary"
				@click="update"
			/>
		</div>
	</div>
</template>

<script setup>
import { useTasksStore } from '#imports'
import { useSubjectsStore } from '#imports'
import { onMounted } from 'vue'
import CreateSubjectTableModal from '~/components/CreateSubjectTableModal.vue'

const page = ref(1)
const openInputMenu = ref(false)
const currentTasks = ref([])
const countSubject = ref([])
const subjectItems = ref([])
const subjectValue = ref('')
const topicsItems = ref([])
const topicsValue = ref('')

function update() {
	let a = (page.value - 1) * 10
	let b = (page.value - 1) * 10 + 10
	currentTasks.value = tasksStore.tasks.tasks.slice(a, b)
}

const isOpen = ref(false)
function openModalCreate() {
	isOpen.value = true
}

const tasksStore = useTasksStore()
const subjectsStore = useSubjectsStore()

onMounted(async () => {
	const sidebar = useSidebarActiveStore()
	sidebar.changeActive(4)

	await subjectsStore.getAllSubjects()
	subjectItems.value = subjectsStore.subjects.subjects.map(item => item['name'])
	subjectValue.value = subjectItems.value[0]
	await tasksStore.getAllTasks(1)
	countSubject.value = tasksStore.tasks.tasks.length
	if (countSubject.value > 10) {
		currentTasks.value = tasksStore.tasks.tasks.slice(0, 10)
	}
})
</script>
