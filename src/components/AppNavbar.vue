<template>
  <b-navbar toggleable="md" type="dark" variant="primary" fixed="top">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="lg" class="mr-sm-2" type="text" :placeholder="$t('search')"/>
          <b-button size="lg" class="my-2 my-sm-0" type="submit">{{ $t('search') }}</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Language" right>
          <b-dropdown-item @click="switchLanguage('zh-TW')" href="#">中文 (臺灣)</b-dropdown-item>
          <b-dropdown-item @click="switchLanguage('en-US')" href="#">English</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import { loadLanguageAsync } from '../setup/i18n-setup'

  export default {
    name: 'AppNavbar',
    methods: {
      switchLanguage (lang) {
        loadLanguageAsync(lang)
        this.$store.dispatch('setLang', lang)
      }
    }
  }
</script>

<style scoped>

</style>
