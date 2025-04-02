<template>
	<div class="flex justify-center">
		<div class="w-[80vw] bg-[#71C9CE] mt-5">
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
