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
				/>
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
					@click="createTopics()"
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



// subjectValue.value = subjects.map(item => item['name'])

async function createTopics() {
	const value = document.getElementById('title').value
	subjectId.value = allSubjects.value.filter(item=> [subjectValue.value].includes(item['name'])).map((item)=> item['id'] )
	if (value) {
		new Promise(res => setTimeout(res, 1000))
		const response = await useTopicsStore().createTopic({ name: value, subject_id: subjectId.value[0] })
		if (response) {
			emit('update:open', false)
		} else {
		}
	} else {
	}
}

defineProps({
	open: Boolean,
	subjects: Array,
})

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
