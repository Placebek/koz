<template>
	<div class="ml-[250px] py-[15vh] mr-[100px] text-black">
		<button
			@click="goBack"
			class="mb-5 px-4 py-2 bg-[#47c0c7] text-white rounded hover:bg-[#3baab1] transition duration-200 flex flex-row items-center gap-2"
		>
			<Icon name="line-md:arrow-small-left" size="25"/>
			<p>Артқа</p>
		</button>

		<div v-if="assignment" class="bg-[#71C9CE] rounded-lg my-3 p-3">
			<h2 class="text-white text-xl font-bold mb-2">
				{{ assignment.task.name }} — {{ assignment.client.name }}
			</h2>

			<div
				v-for="answer in assignment.answers"
				:key="answer.order"
				class="bg-[#7ce3e9] text-black p-3 my-2 rounded"
			>
				<h3 class="font-semibold mb-1">{{ answer.order }}-тапсырма</h3>
				<pre class="whitespace-pre-wrap text-[15px]">{{ answer.text }}</pre>
			</div>

			<div class="bg-[#47c0c7] mt-4 p-2 rounded text-white">
				<h3 class="font-semibold mb-1">Логтар</h3>
				<pre class="whitespace-pre-wrap">{{ assignment.logs }}</pre>
			</div>
		</div>

		<div v-else class="text-gray-500 text-xl">
			ЩААА...
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const id = route.params.assignmentId
const assignmentStore = useAssignmentsStore()
const assignment = ref(null)

const goBack = () => {
	router.back()
}

onMounted(async () => {
	const data = await assignmentStore.getAssignmentById(parseInt(id))
	if (data) {
		assignment.value = data
	} else {
		
	}
})
</script>
