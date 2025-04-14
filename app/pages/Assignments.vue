<template>
	<div class="ml-[250px] py-[15vh] mr-[100px] text-black">
		<div
			v-for="(assignment, index) in allAssignments"
			:key="index"
			class="bg-[#71C9CE] rounded-lg my-3 p-3"
		>
			<div class="flex justify-between">
				<h1 class="text-white font-bold text-xl">
					{{ assignment.id }} - студент
				</h1>
				<div
					class="flex flex-row gap-1 items-center cursor-pointer bg-[#47c0c7] p-2 rounded-lg text-sky-50 hover:text-sky-200 duration-200 font-medium"
				>
					<span> Толығырақ </span>
					<Icon name="line-md:external-link" size="20" />
				</div>
			</div>

			<!-- <div
				v-for="(answer, index) in assignment.answers"
				:key="index"
				class="my-3"
			> -->
			<!-- <div v-for="(text, index) in answer.text.split('\n')" :key="index" class="  ">
					{{text.replace('\n', 'werwefwwefwefwefwefwefwef').replace('\t', '&nbsp;&nbsp;&nbsp;&nbsp;')}}
				</div> -->
			<div class="cursor-pointer bg-[#73d4da] p-2 mt-3 rounded-lg">
				<UAccordion
					:items="items[index]"
					type="multiple"
					class="text-lg"
					style="white-space: pre-wrap; font-size: large !important"
					ui=""
				>
					<template #body="{ item }">
						<div
							class="p-3 text-[17px] bg-[#7ce3e9] rounded-lg flex justify-between items-start gap-3"
						>
							<div class="whitespace-pre-wrap break-words w-full">
								{{ item.content }}
							</div>
							<button
								@click.stop="copyText(item.content)"
								class="text-white hover:text-gray-200"
							>
								<Icon name="ci:copy" size="30" />
							</button>
						</div>
					</template>
				</UAccordion>
			</div>
			<!-- <div>
                    {{ answer.text.replace('\n', '<br>') }}
                </div> -->
			<!-- </div> -->
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const room_id = route.query.room_id

const allAssignments = ref([])
const items = ref([])
const oneAccord = ref([])
const assignmentStore = useAssignmentsStore()

function copyText(text) {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.style.position = "fixed"; 
	document.body.appendChild(textarea);
	textarea.focus();
	textarea.select();

	try {
		const successful = document.execCommand("copy");
		if (successful) {
			alert("Мәтін сәтті көшірілді!");
		} else {
			alert("Көшіру мүмкін болмады.");
		}
	} catch (err) {
		console.error("Көшіру кезінде қате:", err);
		alert("Көшіру мүмкін болмады.");
	}

	document.body.removeChild(textarea);
}


function assignmentToItems() {
	for (let index = 0; index < allAssignments.value.length; index++) {
		const element = allAssignments.value[index].answers
		if (element.length > 0) {
			oneAccord.value = ''
			for (let index = 0; index < element.length; index++) {
				const answerDict = {}
				answerDict.label = element[index].order + '-тапсырма'
				answerDict.content = element[index].text.replace('\n', '')
				oneAccord.value = [...oneAccord.value, answerDict]
			}

			items.value = [...items.value, oneAccord.value]
		}
	}
}

onMounted(async () => {
	await assignmentStore.getAllAssignmentsByRoomId(room_id)
	allAssignments.value = assignmentStore.assignments.assignments
	assignmentToItems()
})
</script>
