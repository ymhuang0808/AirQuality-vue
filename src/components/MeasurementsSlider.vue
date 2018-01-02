<template>
  <Slideout ref="measurementSlider" menu="#menu" panel="#panel">
    <div id="menu" class="slider-content">
      <div class="slider-content__container" v-if="measurement">
        <div class="slider-content__container__header">
          <span class="slider-content__site-name">{{ measurement.properties.name }}</span>
          <button type="button" class="close" aria-label="Close" v-on:click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="slider-content__container__main">

        </div>
      </div>
    </div>
    <div id="panel">
    </div>
  </Slideout>
</template>

<script>
  import Slideout from 'vue-slideout'

  export default {
    name: 'MeasurementsSlider',
    components: { Slideout },
    props: ['measurement'],
    methods: {
      close () {
        console.log('close slider')
        this.$children[0].slideout.close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
    width: 100%;
    height: 100%;
  }

  .slideout-menu {
    position: relative;
    top: 0;
    bottom: 0;
    width: 28vw;
    min-height: 100vh;
    margin-top: 52px;
    padding: 25px 10px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
    will-change: transform;
    background-color: #FFF;

    @include box-shadow(0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19))
  }

  .slideout-menu-left {
    left: 0;
  }

  .slideout-menu-right {
    right: 0;
  }

  .slideout-panel {
    z-index: -1000;
    width: 0;
    height: 0;
    display: none;
  }

  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: hidden;
  }

  .slideout-open .slideout-menu {
    display: block;
  }
</style>
