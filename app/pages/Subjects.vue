<template>
    <div class="lg:ml-[250px] lg:mr-[100px] pt-[100px] flex flex-col ">
        <div class="w-full flex flex-row bg-[#A6E3E9] border-2 rounded-t-lg border-sky-400  text-black h-[5vh] ">
            <div class="border-r border-sky-400 flex justify-center w-[30%]">
                ID
            </div>
            <div class="border-r border-sky-400 flex justify-center w-[60%]">
                Пән аты
            </div>
            <div class="w-[10%] flex justify-center">
                <Icon name="material-symbols:delete" size="25" />
            </div>
        </div>
        <div class="w-full flex flex-row bg-[#A6E3E9] border-x-2 border-b-2 border-sky-400  text-black ">
             <TableForm :data="{id: 1, name: 'Алгоритм'}"/>
        </div>
    </div>
</template>
<script>
console.log(import.meta.env.BASE_URL, 'wfwegwrewrwergw')
</script>