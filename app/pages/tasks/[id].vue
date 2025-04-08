<template>
	<div
		class="lg:ml-[250px] lg:mr-[100px] pt-[50px] flex flex-col gap-5 text-black"
	>
		<div class="flex flex-row items-center gap-5">
			<div
				class="size-[50px] flex justify-center items-center cursor-pointer text-[#508aff] hover:text-[#a0c0ff] transition duration-200"
			>
				<Icon name="lets-icons:back" size="40" @click="navigateTo('/tasks')"/>
			</div>
			<h2 class="font-semibold">
				Тақырып аты:
				<span class="text-blue-600 text-xl">{{ taskResponse.name }}</span>
			</h2>
		</div>

		<div
			class="lg:w-full lg:min-h-[60vh] bg-[#A6E3E9] rounded-lg border-2 border-sky-400 flex justify-center items-center p-5"
		>
			<div v-if="taskOptions.loading" class="text-center py-4 text-green-700">
				ЩААА...
			</div>
			<div
				v-if="countTaskOptions === 0"
				class="text-black text-center mt-[5vh] italic font-semibold text-2xl"
			>
				<h2 v-if="photos.length === 0">Әзірге ештеңе жоқ</h2>
				<div class="text-sky-500">
					<input
						id="photos"
						type="file"
						multiple
						accept="image/*"
						@change="handlePhotoUpload"
						class="hidden"
						ref="fileInput"
					/>
					<Icon
						v-if="photos.length === 0"
						name="line-md:plus-square"
						size="50"
						class="hover:scale-120 transition duration-300 cursor-pointer"
						@click="triggerFileInput"
					/>
				</div>
				<div v-if="photos.length > 0" class="flex flex-col gap-3">
					<p class="mb-2">Таңдалған суреттер:</p>
					<div class="flex flex-wrap gap-4 items-center">
						<div
							v-for="(photo, index) in photos"
							:key="index"
							class="relative w-30 h-30 border rounded overflow-hidden"
						>
							<img
								:src="photo.preview"
								alt="Preview"
								class="object-cover w-full h-full"
							/>
							<button
								@click="removePhoto(index)"
								class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:scale-110 transition duration-300 hover:bg-red-400 cursor-pointer"
							>
								×
							</button>
						</div>
						<Icon
							name="line-md:plus-square"
							size="50"
							class="hover:scale-120 transition duration-300 cursor-pointer text-sky-500"
							@click="triggerFileInput"
						/>
					</div>
					<div
						class="flex flex-row gap-3 text-lg p-3 rounded-lg text-white bg-blue-600 justify-center items-center hover:bg-blue-500 cursor-pointer"
						@click="sendTaskOptions"
					>
						<Icon name="tabler:send" size="30" />
						<h2>Жіберу</h2>
					</div>
				</div>
			</div>
			<div v-if="countTaskOptions > 0" class="">
				<div
					v-for="(options, index) in allTaskOptions"
					:key="options[0].task_number"
					class="grid grid-cols-3 grid-rows-3 gap-3"
				>
					<div class="flex flex-col items-center">
						<img
							:src="'http://192.168.152.31:8000/' + options[0].file_path"
							alt=""
                            @click="navigateTo('http://192.168.152.31:8000/'+options[0].file_path, { external: true })"
                            class="cursor-pointer"
						/>
						<h2>№{{ index+1 }}</h2>
					</div>
				</div>
			</div>
			<div v-if="taskOptions.error" class="text-red-500 text-center py-4">
				{{ taskOptions.error }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { useTaskOptionsStore } from '#imports'
import { useRoute } from '#app'

const route = useRoute()
const id = route.params.id
const countTaskOptions = ref(0)
const photos = ref([])
const fileInput = ref(null)
const allTaskOptions = ref([])

const taskOptions = useTaskOptionsStore()
const task = useTasksStore()
const taskResponse = await task.getTaskById(id)

const triggerFileInput = () => {
	fileInput.value.click()
}

const handlePhotoUpload = event => {
	const files = Array.from(event.target.files)
	files.forEach(file => {
		const reader = new FileReader()
		reader.onload = e => {
			photos.value.push({
				file,
				preview: e.target.result,
			})
		}
		reader.readAsDataURL(file)
	})
}

const removePhoto = index => {
	photos.value.splice(index, 1)
}

async function sendTaskOptions() {
	if (!id) {
		console.error('ID задачи не определен')
		return
	}
	if (photos.value.length === 0) {
		console.error('Нет выбранных файлов')
		return
	}

	const form = new FormData()
	form.append('task_id', parseInt(id))
	photos.value.forEach(photo => {
		form.append('option_files', photo.file)
	})

	console.log('FormData contents:')
	for (let [key, value] of form.entries()) {
		console.log(`${key}: ${value}`)
	}

	try {
		await taskOptions.createTaskOption(form)
		photos.value = []
	} catch (error) {
		console.error('Ошибка при отправке:', error)
	}
}

onMounted(async () => {
	await taskOptions.getAllTaskOptions(id)
	allTaskOptions.value = taskOptions.task_options.task_options.map(
		item => item.option_file
	)
	countTaskOptions.value = taskOptions.task_options.task_options.length
})
</script>
