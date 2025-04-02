<template>
	<div
		class="p-2 flex flex-row  fixed lg:min-w-[250px]  border-[#c5c5c5]"
	>
		<div class="lg:hidden flex flex-col z-50 items-center justify-between p-3 bg-[#A6E3E9] rounded-2xl">
			<Logo />
			<div class=" bg-[#A6E3E9] ">
				<Icon
					class="z-50 cursor-pointer top-2 right-2 absolute "
					style="color: aqua"
					size="40"
					name="mdi:hamburger-menu"
					@click="open = true"
				/>
			</div>
			<div v-if="open">
				<Icon
				class="z-50 cursor-pointer top-2 right-2 absolute transition-all duration-300"
				style="color: aqua"
				size="40"
				name="mdi:hamburger-menu"
				@click="open = false"
			/>
				<Sidebar />
			</div>
		</div>
		<div class="hidden lg:flex h-screen flex-col bg-[#A6E3E9] p-2 rounded-2xl items-center">
			<Logo/>
			<Sidebar />
		</div>
	</div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'

const open = ref(false)


const handleHome = () => checkToken('/')

</script>
