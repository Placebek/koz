<template>
    <div class="ml-[250px] py-[15vh] mr-[100px] text-black ">
        <div v-for="(item, index) in allAssignments" :key="index" class="bg-[#71C9CE] rounded-lg my-3" >
            {{ item.id }}
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const room_id = route.query.room_id

const allAssignments = ref([])


const assignmentStore = useAssignmentsStore()


onMounted (async() => {
    await assignmentStore.getAllAssignmentsByRoomId(room_id)
    allAssignments.value = assignmentStore.assignments.assignments

})

</script>