<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-[#E3FDFD] p-[15vh] z-50">
        <div class="bg-[#A6E3E9] p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h1 class="text-3xl text-gray-800 font-semibold mb-6 text-center">Бөлме құру</h1>
            <div class="space-y-6">
                <div>
                    <label for="max_clients" class="block text-gray-700 mb-1">Студенттер шегі</label>
                    <input
                        id="max_clients"
                        v-model="maxClients"
                        type="number"
                        min="0"
                        placeholder="Сан еңгізіңіз"
                        class="w-full px-4 py-2 bg-[#E3FDFD] rounded focus:outline-none focus:ring-2 text-black focus:ring-gray-500"
                        required
                    />
                </div>
                <div>
                    <label for="subject" class="block text-gray-700 mb-1">Пән аты</label>
                    <UInputMenu
                        v-model="subjectValue"
                        :items="subjectItems"
                        color="neutral"
                        style="background: #508aff"
                        @change="topicsGet()"
                    />
                </div>
                <div>
                    <label for="topic" class="block text-gray-700 mb-1">Тақырып аты</label>
                    <UInputMenu
                        v-model="topicValue"
                        :items="topicsItems"
                        color="neutral"
                        style="background: #508aff"
                        @change="tasksGet()"
                    />
                </div>
                <div>
                    <label for="task" class="block text-gray-700 mb-1">Тапсырма аты</label>
                    <UInputMenu
                        v-model="taskValue"
                        :items="tasksItems"
                        color="neutral"
                        style="background: #508aff"
                    />
                </div>
                <button
                    @click="createRoom"
                    :disabled="roomsStore.loading"
                    class="w-full py-2 bg-[#71C9CE] text-white rounded hover:bg-gray-700 transition-colors cursor-pointer"
                >
                    {{ roomsStore.loading ? 'Құрылуда...' : 'Құрып жіберу' }}
                </button>
                <div v-if="roomsStore.error" class="text-red-500 text-center">
                    {{ roomsStore.error }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoomsStore } from '#imports'
import { useTopicsStore } from '#imports'
import { useSubjectsStore } from '#imports'
import { useTasksStore } from '#imports'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Rooms
const roomsStore = useRoomsStore()
const maxClients = ref(0)

// Subjects
const subjectItems = ref([])
const subjectValue = ref('')
const subjectId = ref(0)
const allSubjects = ref([])

// Topics
const allTopics = ref([])
const topicsItems = ref([])
const topicId = ref(0)
const topicValue = ref('')

// Tasks
const allTasks = ref([])
const tasksItems = ref([])
const taskId = ref(0)
const taskValue = ref('')

const subjectsStore = useSubjectsStore()
const topicsStore = useTopicsStore()
const tasksStore = useTasksStore()

async function createRoom() {
  taskId.value = allTasks.value.tasks
    .filter(item => [taskValue.value].includes(item.name))
    .map(item => item.id)[0]

  const data = {
    max_clients: Number(maxClients.value),
    task_id: taskId.value || 0,
  }

  const response = await roomsStore.createRoom(data)
  if (response.success) {
    router.push({
      path: `/rooms/${response.room.id}`,
      query: { taskId: taskId.value },
    })
  }
}

async function topicsGet() {
    topicValue.value = ''
    taskValue.value = ''
    subjectId.value = allSubjects.value
        .filter(item => [subjectValue.value].includes(item.name))
        .map(item => item.id)[0]
    await topicsStore.getAllTopics(subjectId.value)
    allTopics.value = topicsStore.topics.topics || []
    topicsItems.value = allTopics.value.map(item => item.name)
    if (topicsItems.value.length > 0) topicValue.value = topicsItems.value[0]
    await tasksGet()
}

async function tasksGet() {
    taskValue.value = ''
    topicId.value = allTopics.value
        .filter(item => [topicValue.value].includes(item.name))
        .map(item => item.id)[0]
    await tasksStore.getAllTasks(topicId.value)
    allTasks.value = tasksStore.tasks || []
    tasksItems.value = allTasks.value.tasks.map(item => item.name || 'Без названия')
    if (tasksItems.value.length > 0) taskValue.value = tasksItems.value[0]
}

onMounted(async () => {
    const sidebar = useSidebarActiveStore()
    sidebar.changeActive(0)

    await subjectsStore.getAllSubjects()
    allSubjects.value = subjectsStore.subjects.subjects || []
    subjectItems.value = allSubjects.value.map(item => item.name)
    if (subjectItems.value.length > 0) subjectValue.value = subjectItems.value[0]
    await topicsGet()
})
</script>