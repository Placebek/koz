<template>
  <div class="bg-[#E3FDFD] min-h-screen w-full relative">
    <Header />
    
    <main class="flex-grow">
      <NuxtPage />
    </main>
  </div>
</template>

<script>
import Header from '~/components/main/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
