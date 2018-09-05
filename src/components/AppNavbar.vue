<template>
  <b-navbar toggleable="md" type="dark" variant="primary" fixed="top" :sticky="true">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="../assets/logo.png" alt="logo" id="logo"/>{{ $t('site_name') }}</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-text>{{ $t('navbar.beta_version') }}</b-nav-text>
        <b-nav-item :to="{ name: 'Map' }" exact>{{ $t('navbar.map') }}</b-nav-item>
        <b-nav-item :to="{ name: 'About' }" exact>{{ $t('navbar.about') }}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!--
            TODO: Waiting for backend implementation
         -->
        <!--
        <b-nav-form v-if="$route.name === 'Map'">
          <b-form-input size="lg" class="mr-sm-2" type="text" :placeholder="$t('search')"/>
          <b-button size="lg" class="my-2 my-sm-0" type="submit">{{ $t('search') }}</b-button>
        </b-nav-form>
        -->

        <!--
            TODO: use dropdown button.
            Wait for the Bootstrap-vue implementing dropdown form:
            https://github.com/bootstrap-vue/bootstrap-vue/issues/747
        -->
        <b-nav-item-dropdown v-if="navFilter.isVisible && $route.name === 'Map'" :text="$t('filter')" size="lg" class="m-md-2" right>
          <b-form-group :label="$t('navbar.filter.by_source')" class="px-3">
            <b-form-checkbox-group buttons v-model="filterSelected" name="nav-filter" :options="navFilterOptions">
            </b-form-checkbox-group>
          </b-form-group>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Language" class="m-md-2" right>
          <b-dropdown-item @click="switchLanguage('zh-TW')" href="#">中文 (臺灣)</b-dropdown-item>
          <b-dropdown-item @click="switchLanguage('en-US')" href="#">English</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import { loadLanguageAsync } from '../setup/i18n-setup'
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppNavbar',
    data: () => {
      return {
        navFilterOptions: []
      }
    },
    computed: {
      ...mapGetters([
        'navFilter',
        'allLatestMeasurements'
      ]),
      filterSelected: {
        get: function () {
          let selected = this.$store.getters.navFilterSelected
          return selected
        },
        set: function (value) {
          this.$store.dispatch('setNavFilterSelected', value)
        }
      }
    },
    watch: {
      allLatestMeasurements: function (data) {
        let source = data.source
        let options = []

        source.forEach((item) => {
          options.push({
            text: this.$t(item),
            value: item
          })
        })

        this.navFilterOptions = options
      }
    },
    methods: {
      switchLanguage (lang) {
        loadLanguageAsync(lang)
        this.$store.dispatch('setLang', lang)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #logo {
    height: 50px;
  }

  .nav-link, .nav-link span {
    font-weight: 400;
    font-size: 1rem;
  }
</style>
