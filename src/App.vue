<template>
  <div id="app">
    <header><app-navbar></app-navbar></header>
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
  import AppNavbar from '@/components/AppNavbar'

  export default {
    name: 'app',
    components: { AppNavbar }
  }
</script>

<style lang="scss" src="./styles/scss/main.scss"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
