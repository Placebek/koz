<template>
	<div
		class="flex rounded-lg bg-[#71C9CE] p-3 text-white shadow-xl hover:scale-[103%] transition-all duration-300 hover:shadow-2xl mt-5 cursor-pointer relative flex-row gap-5 tooltip"
		@click="navigateTo(`/assignments?room_id=${data.id}`)"
	>
		<div class="text-lg font-bold">
			{{ data.id }}
		</div>
		<div class="text-[#4784ff] font-semibold">
			Максимум студент саны:
			<span class="text-[#5f94ff] font-black">{{ data.max_clients }}</span>
		</div>
		<div>Ұзақтығы: {{ data.duration }}</div>
		<div class="absolute right-3">
			{{ data.created_at.split('T')[0] }}
		</div>
		<div>
			<span class="tooltiptext">
				Уақыт: {{ data.created_at.split('T')[1].split('.')[0] }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
	data: Object,
})
</script>

<style>
.tooltip .tooltiptext {
	visibility: hidden;
	min-width: 120px;
	background-color: rgb(77, 121, 255);
	color: #fff;
	text-align: center;
	padding: 5px;
	padding-left: 4px;
	padding-right: 4px;
	border-radius: 6px;

	position: absolute;
	z-index: 1;
	bottom: 110%;
	left: 40%;
  
}

.tooltip:hover .tooltiptext {
	visibility: visible;
}
</style>
