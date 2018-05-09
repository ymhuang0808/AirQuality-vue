<template>
  <div class="wrapper">
    <header><app-navbar></app-navbar></header>
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
  import AppNavbar from '@/components/AppNavbar'

  export default {
    name: 'NavigationBar',
    components: { AppNavbar }
  }
</script>

<style>
</style>
