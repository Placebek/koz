<template>
    <div >
        <header class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer ">
            <div
				class="text-black flex flex-row gap-3 text-[6vw] sm:text-[4.4vw] md:text-[3vw] lg:text-[2.2vw] xl:text-[1.9vw] items-center cursor-pointer"
			>
				<img
					src="../../assets/img/icons8-глаз-96.png"
					alt=""
					class="w-10 h-10"
				/>

				<p class="text-[#75a3ff] font-semibold tracking-wide">KΘZ</p>
			</div>
        </header>
        <div class="px-4 frow text-black">
            <div class="grid gap-4">
                <div v-for="(item, index) in items" :key="index" class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-neutral-100 ">
                    <span class="">{{ item.items }}</span>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
const items = ref([
	{
		items: 'Басты бет',
        path: '/',
	},
	{
		items: 'Пәндер',
        path: '/subjects',

	},
	{
		items: 'Тақырыптар',
        path: '/subjects',

	},
	{
		items: 'Тақырып нұсқалары',
        path: '/subjects',

	},
	{
		items: 'Бапталар',
        path: '/subjects',

	},
])
</script>
