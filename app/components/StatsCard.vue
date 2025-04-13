<template>
	<div class="flex justify-center shadow-xl hover:scale-[103%] transition-all duration-300 hover:shadow-2xl mt-5 cursor-pointer">
		<div class="w-[80vw] h-[5vh] bg-[#71C9CE]  rounded-lg">
			{{ data.value }}
		</div>
	</div>
</template>

<script>
    export default {
  name: 'StatsCard',
  props: {
    data: Object
  }
}
</script>
