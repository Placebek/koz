<template>
	<UModal
		:open="open"
		@update:open="$emit('update:open', $event)"
		class="lg:max-w-[25vw] lg:min-h-[20vh]"
	>
	
		<template #content>
			<div class="p-4">
				<h2>Пәннің тақырыбын таңдаңыз:</h2>
				<UInputMenu
					v-model="subjectValue"
					:items="subjectItems"
					color="neutral"
					style="background: #508aff"
					class="mt-2 mb-3"
					v-on:change="topicsGet()"
				/>
				<h2>Тақырыптың тақырыбын таңдаңыз:</h2>
				<UInputMenu
					v-model="topicValue"
					:items="topicsItems"
					color="neutral"
					style="background: #508aff"
					class="my-2"
				/>
				<div>
					<h2></h2>
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
					@click="createTasks()"
					class="mt-4"
				/>
				<UButton
					label="Жоқ, керек емес"
					@click="$emit('update:open', false)"
					class="mt-4 ml-4"
					color="error"
				/>
			</div>
		</template>
	</UModal>
</template>

<script setup>
import { useTopicsStore } from '#imports'
import { useSubjectsStore } from '#imports'

const emit = defineEmits(['update:open'])

const subjectItems = ref([])
const subjectValue = ref('')
const subjectId = ref(0)
const allSubjects = ref([])

const allTopics = ref([])
const topicsItems = ref([])
const topicId = ref(0)
const topicValue = ref('')


async function createTasks() {
	const value = document.getElementById('title').value
	topicId.value = allTopics.value.filter(item=> [topicValue.value].includes(item['name'])).map((item)=> item['id'] )
	if (value) {
		new Promise(res => setTimeout(res, 1000))
		const response = await useTasksStore().createTask({ name: value, topic_id: topicId.value[0] })
		if (response) {
			emit('update:open', false)
		} else {
		}
	} else {
	}
}

async function topicsGet() {
	topicValue.value = ''
	subjectId.value = allSubjects.value
		.filter(item => [subjectValue.value].includes(item['name']))
		.map(item => item['id'])
	await topicsStore.getAllTopics(subjectId.value)
	allTopics.value = topicsStore.topics.topics
	topicsItems.value = topicsStore.topics.topics.map(item => item['name'])
	topicValue.value = topicsItems.value[0]
}

defineProps({
	open: Boolean,
})

const subjectsStore = useSubjectsStore()
const topicsStore = useTopicsStore()




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
