<template>
	<div class="border-r flex justify-center w-[30%] border-sky-400">{{ props.data.id }}</div>
	<div class="flex justify-center w-[70%]">{{ props.data.name }}</div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
	data: Object,
})
</script>
