<template>
  <NavBar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<script setup>
/*
  imports
*/

  import { onMounted } from 'vue'
  import { useStoreAuth } from '@/stores/storeAuth'
  import NavBar from '@/components/Layout/NavBar.vue'

/*
  stores
*/

  const storeAuth = useStoreAuth()

/*
  mounted
*/

  onMounted(() => {
    storeAuth.firebaseInit()
  })
  
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>