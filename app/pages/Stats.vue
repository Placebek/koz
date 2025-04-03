<template>
	<div
		class="flex flex-col pt-[15vh] xl:pl-[] lg:pl-[250px] md:px-[5.6vw] sm:px-[6vw] px-[7vw]"
	>
		<div class="flex flex-col lg:flex-row">
			<div
				class="min-w-[50vw] xl:min-w-[40vw] lg:min-w-[42vw] md:min-w-[45vw] sm:min-w-[47vw]"
			>
				<canvas id="myChart"></canvas>
			</div>
			<div
				class="grid grid-cols-2 grid-rows-1 gap-10 w-full lg:ml-[5vw] mt-[2vh] lg:mt-0 h-[30vh]"
			>
				<div
					class="bg-[#A6E3E9] rounded-[10px] text-[#75a3ff] flex justify-center items-center text-[4vw] font-semibold flex-col p-2 text-center sm:text-[2.5vw] lg:text-[1.8vw] xl:text-[1.7vw] shadow-xl" :animate="{ rotate: 360 }" 
				>
					<span> Бүгінге дейін өтілген тест саны: </span>
					<span
						class="text-white text-[6vw] font-bold sm:text-[4.5vw] lg:text-[3vw] xl:text-[2.4vw]"
						>{{ 65 }}</span
					>
				</div>
				<div
					class="bg-[#A6E3E9] text-[#75a3ff] rounded-[10px] flex justify-center items-center text-[4vw] font-semibold flex-col p-2 text-center sm:text-[2.5vw] lg:text-[1.8vw] xl:text-[1.7vw] shadow-xl"
				>
					<span> Ең үздік студент: </span>
					<span
						class="text-white text-[6vw] font-bold sm:text-[4.5vw] lg:text-[3vw] xl:text-[2.4vw]"
						>{{ 'Жандарбек' }}</span
					>
				</div>
			</div>
		</div>
		<div class="mt-[5vh]">
			<StatsCard v-for="(item, index) in data" :key="index" :data="item" />
		</div>
	</div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import { useSidebarActiveStore } from '#imports';


import StatsCard from '../components/StatsCard.vue'

export default defineComponent({
	name: 'Stats',
	components: {
		StatsCard,
	},
	data() {
		return {
			data: [
				{ title: 'Пользователи', value: 42 },
				{ title: 'Заказы', value: 150 },
				{ title: 'Доход', value: 3000 },
			],
		}
	},
	setup() {
		onMounted(() => {
			const sidebar = useSidebarActiveStore()
			sidebar.changeActive(6)
			const ctx = document.getElementById('myChart')
			new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Дс.', 'Сс.', 'Ср.', 'Бс.', 'Жм.', 'Сб.', 'Жс.'],
					datasets: [
						{
							label: 'Бөлмелер істелген саны',
							data: [12, 19, 3, 5, 2, 3, 5],
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			})
		})
	},
})
</script>
