<template>
  <div class="bg-[#E3FDFD] min-h-screen relative">
    <Header />
    
    <main class="flex-grow">
      <NuxtPage/>
    </main>
  </div>
</template> 

<script>
import Header from '~/components/main/Header.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    Header
  }
}
</script>
