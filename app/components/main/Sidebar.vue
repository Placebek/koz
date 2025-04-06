<template>
	<div>
		<header
			class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer"
		></header>
		<div class="px-4 frow text-black">
			<div class="grid gap-4">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="flex items-center gap-3 px-3 py-1 transition rounded-xl cursor-pointer hover:bg-[#CBF1F5]"
					@click="handleLink(item.path, item.id)"
				>
					<div v-if="item.id == change.currentId()" class="flex gap-3">
						<Icon :name="item.icon" size="30" style="color: #ffffff" />
						<span class="font-medium text-white">{{ item.items }}</span>
					</div>
					<div v-else class="flex gap-3">
						<Icon :name="item.icon" size="30" style="color: #508aff" />
						<span class="font-medium">{{ item.items }}</span>
					</div>
				</div>
				<div
					class="flex flex-row p-3 gap-3 rounded-xl bg-blue-700 absolute bottom-8 hover:bg-blue-500 transition cursor-pointer text-white justify-center items-center"
				>
					<Icon name="mdi:plus-circle" size="30" />
					<p>Бөлме жасау</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup> 
import { useSidebarActiveStore } from '#imports'
const change = useSidebarActiveStore()
const items = ref([
	{
		id: 1,
		items: 'Басты бет',
		path: '/',
		icon: 'mdi:home',
	},
	{
		id: 2,
		items: 'Пәндер',
		path: '/subjects',
		icon: 'material-symbols:book-2',
	},
	{
		id: 3,
		items: 'Тақырыптар',
		path: '/topics',
		icon: 'mdi:book-open-page-variant-outline',
	},
	{
		id: 4,
		items: 'Нұсқалары',
		path: '/subjects',
		icon: 'mdi:drive-document',
	},
	{
		id: 5,
		items: 'Баптаулар',
		path: '/subjects',
		icon: 'solar:settings-bold',
	},
	{
		id: 6,
		items: 'Санақ',
		path: '/stats',
		icon: 'mdi:graph-box',
	},
])
const { checkToken } = useAuth()
const handleLink = (link, id) =>{
    change.changeActive(id)
    checkToken(link)
} 
</script>
