<template>
	<div class="w-full p-3 flex flex-row  bg-[#CBF1F5] relative">
		<div class="lg:hidden flex">
			<Sidebar />
		</div>
		<div class="hidden lg:flex">
			<Sidebar />
		</div>
	</div>
</template>

<script>
import Sidebar from './Sidebar.vue'
export default {
	setup() {
		const { checkToken } = useAuth()

		const handleHome = () => checkToken('/')

		return {
			handleHome,
		}
	},
	components: {
		Sidebar,
	},
}
</script>
