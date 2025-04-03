<template>
  <div class="border-r flex justify-center w-[30%] border-sky-400">{{ data.id }}</div>
  <div class="flex justify-center w-[70%]">{{ data.name }}</div>
</template>

<script setup>
import { defineProps, toRaw } from 'vue'

const props = defineProps({
  data: Object,
})

const subjectData = toRaw(props.data)
</script>
