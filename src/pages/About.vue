<template>
  <div id="about-page" class="main-content position-relative">
    <div class="about-page__header">
      <h1 class="about-page__header__title">{{ $t('about.name') }} {{ $t('site_name') }}</h1>
      <span class="about-page__header__slogan">{{ $t('slogan') }}</span>
    </div>
    <div class="about-page__data-source about-page__contact-info--bg-gray">
      <b-container class="about-page__contact-info__content">
        <h2 class="about-page__contact-info__content__title">{{ $t('about.contact_info.name') }}</h2>
        <i18n path="about.contact_info.contact_us_intro" tag="p" class="lead">
          <a place="email" href="mailto:hi@howgoodair.org">hi@howgoodair.org</a>
          <span place="site_name">{{ $t('site_name') }}</span>
        </i18n>
        <b-row>
          <b-col col cols="12" md="4" lg="4" class="about-page__contact-info__content__tiwtter">
            <img src="../assets/imgs/icons/twitter_icon-1x.png" srcset="../assets/imgs/icons/twitter_icon-1x.png 1x, ../assets/imgs/icons/twitter_icon-2x.png 2x, ../assets/imgs/icons/twitter_icon-3x.png 3x, ../assets/imgs/icons/twitter_icon-4x.png 4x" />
            <a href="https://twitter.com/howGoodAir" target="_blank">@howGoodAir</a>
          </b-col>
          <b-col col cols="12" md="4" lg="4" class="about-page__contact-info__content__fb">
            <img src="../assets/imgs/icons/fb_icon-1x.png" srcset="../assets/imgs/icons/fb_icon-1x.png 1x, ../assets/imgs/icons/fb_icon-2x.png 2x, ../assets/imgs/icons/fb_icon-3x.png 3x, ../assets/imgs/icons/fb_icon-4x.png 4x" />
            <a href="https://www.facebook.com/howGoodAir/" target="_blank">@howGoodAir</a>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="about-page__privacy-policy about-page__privacy-policy--bg-white">
      <b-container class="about-page__privacy-policy__content">
        <h2 class="about-page__privacy-policy__content__title">{{ $t('about.privacy_policy.name') }}</h2>
        <b-row>
          <b-col col cols="12" class="about-page__privacy-policy__content__brief">
            <i18n path="about.privacy_policy.view_brief_statement" tag="p" class="lead">
              <a place="privacy_policy" href="#" v-b-modal="'privacy-policy-full-statements'">{{ $t('about.privacy_policy.name') }}</a>
              <router-link place="site_name" :to="{ name: 'Map' }">{{ $t('site_name') }}</router-link>
            </i18n>
            <b-modal id="privacy-policy-full-statements" size="lg" ok-only :ok-title="$t('about.privacy_policy.i_got_it')">
              <div slot="modal-header">
                <h3 slot="modal-title">{{ $t('about.privacy_policy.name') }}</h3>
              </div>
              <div v-html="$t('about.privacy_policy.full_text')" class="about-page__privacy-policy__content__full_text">
              </div>
            </b-modal>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="about-page__data-source about-page__data-source--bg-gray">
      <b-container class="about-page__data-source__content">
        <h2 class="about-page__data-source__content__title">{{ $t('about.data_source.name') }}</h2>
        <b-row>
          <b-col col lg="4" class="about-page__data-source__content__item">
            <b-img rounded height="120" src="../assets/imgs/source-logos/lass.jpg" center />
            <h4 class="about-page__data-source__content__item__name">{{ $t('lass') }}</h4>
          </b-col>
          <b-col col lg="4" class="about-page__data-source__content__item">
            <b-img rounded height="120" src="../assets/imgs/source-logos/airbox.png" center />
            <h4 class="about-page__data-source__content__item__name">{{ $t('airbox') }}</h4>
          </b-col>
          <b-col col lg="4" class="about-page__data-source__content__item">
            <b-img rounded height="120" src="../assets/imgs/source-logos/epa.png" center />
            <h4 class="about-page__data-source__content__item__name">{{ $t('epa') }}</h4>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="about-page__licenses-info about-page__licenses-info--bg-white">
      <b-container class="about-page__licenses-info__content">
        <h2 class="about-page__licenses-info__content__title">{{ $t('about.licenses_information.name') }}</h2>
        <i18n path="about.licenses_information.project_description" tag="p" class="lead">
          <a place="license" href="https://github.com/ymhuang0808/AirQuality-vue/blob/master/LICENSE" target="_blank">{{ $t('about.licenses_information.apache20_license') }}</a>
          <font-awesome-icon place="github_icon" :icon="githubIcon" />
        </i18n>
        <p class="lead" v-html="$t('about.licenses_information.thanks')"></p>
        <b-row>
          <b-col cols="12">
            <h3>{{ $t('about.licenses_information.libraries') }}</h3>
            <ul>
              <li><a href="https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt" target="_blank">@fortawesome/fontawesome</a></li>
              <li><a href="https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt" target="_blank">@fortawesome/fontawesome-free-brands</a></li>
              <li><a href="https://github.com/FortAwesome/vue-fontawesome/blob/master/LICENSE.txt" target="_blank">@fortawesome/vue-fontawesome</a></li>
              <li><a href="https://github.com/axios/axios/blob/master/LICENSE" target="_blank">axios</a></li>
              <li><a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank">bootstrap</a></li>
              <li><a href="https://github.com/bootstrap-vue/bootstrap-vue/blob/dev/LICENSE" target="_blank">bootstrap-vue</a></li>
              <li><a href="https://github.com/motdotla/dotenv/blob/master/LICENSE" target="_blank">dotenv</a></li>
              <li><a href="https://github.com/jquery/jquery/blob/master/LICENSE.txt" target="_blank">jquery</a></li>
              <li><a href="https://github.com/lodash/lodash/blob/master/LICENSE">lodash</a></li>
              <li><a href="https://github.com/mapbox/mapbox-gl-js/blob/master/LICENSE.txt" target="_blank">mapbox-gl</a> </li>
              <li><a href="https://github.com/phegman/vue-mapbox-gl/blob/master/LICENSE" target="_blank">mapbox-gl-vue</a></li>
              <li><a href="https://github.com/moment/moment/blob/master/LICENSE" target="_blank">moment</a></li>
              <li><a href="https://github.com/ryanve/verge/blob/master/LICENSE.md" target="_blank">verge</a></li>
              <li><a href="https://github.com/vuejs/vue/blob/master/LICENSE" target="_blank">vue</a></li>
              <li><a href="https://github.com/kazupon/vue-i18n/blob/master/LICENSE" target="_blank">vue-i18n</a></li>
              <li><a href="https://github.com/Akryum/vue-resize#license" target="_blank">vue-resize</a></li>
              <li><a href="https://github.com/vuejs/vue-router/blob/dev/LICENSE" target="_blank">vue-router</a></li>
              <li><a href="https://github.com/vouill/vue-slideout" target="_blank">vue-slideout</a></li>
              <li><a href="https://github.com/vuejs/vuex/blob/dev/LICENSE" target="_blank">vuex</a></li>
              <li><a href="https://github.com/championswimmer/vuex-persist/blob/master/LICENSE.md" target="_blank">vuex-persist</a></li>
            </ul>
            <i18n path="about.licenses_information.more_licenses" tag="p">
              <a place="more_3rd_libraries" href="https://github.com/ymhuang0808/AirQuality-vue/blob/develop/LICENSE" target="_blank">{{ $t('about.licenses_information.here') }}</a>
            </i18n>
          </b-col>
          <b-col cols="12">
            <h3>{{ $t('about.licenses_information.images_photos') }}</h3>
            <ul>
              <i18n path="about.licenses_information.about_page_header_img" tag="li">
                <router-link place="about_page" :to="{ name: 'About' }">{{ $t('about.licenses_information.about_page') }}</router-link>
                <a place="bg_about_author" href="https://www.flickr.com/photos/70036458@N04/" target="_blank">Wenbin Qian</a>
                <a place="license" href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC BY-SA 2.0</a>
              </i18n>
              <i18n path="about.licenses_information.about_page_social_icons" tag="li">
                <router-link place="about_page" :to="{ name: 'About' }">{{ $t('about.licenses_information.about_page') }}</router-link>
                <a place="author" href="https://www.iconfinder.com/Re66y" target="_blank"> Gregor Cresnar</a>
              </i18n>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import { faGithub } from '@fortawesome/fontawesome-free-brands'

  export default {
    name: 'AboutPage',
    computed: {
      githubIcon () {
        return faGithub
      }
    },
    components: {
      FontAwesomeIcon
    }
  }
</script>

<style lang="scss" scoped>
  .about-page {
    &__header {
      text-align: center;
      background-color: rgba($white, .2);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      background-blend-mode: screen;

      $base-padding-top-bottom: 30px;

      @include media-breakpoint-only(xs) {
        background-image: url("../assets/imgs/background/bg_about-320.png");
        max-height: 116px;
        padding: $base-padding-top-bottom*1 0;
      }
      @include media-breakpoint-only(sm) {
        background-image: url("../assets/imgs/background/bg_about-768.png");
        max-height: 278px;
        padding: $base-padding-top-bottom*2 0;
      }
      @include media-breakpoint-only(md) {
        background-image: url("../assets/imgs/background/bg_about-1024.png");
        max-height: 371px;
        padding: $base-padding-top-bottom*3 0;
      }
      @include media-breakpoint-only(lg) {
        background-image: url("../assets/imgs/background/bg_about-1200.png");
        max-height: 434px;
        padding: $base-padding-top-bottom*4 0;
      }
      @include media-breakpoint-only(xl) {
        background-image: url("../assets/imgs/background/bg_about-1600.png");
        max-height: 579px;
        padding: $base-padding-top-bottom*5 0;
      }

      &__title {
        text-align: center;
        color: $white;
        margin-bottom: 0 !important;
      }

      &__slogan {
        color: $white;
        display: block;
        font-size: $font-size-lg;
      }
    }

    &__contact-info, &__privacy-policy, &__data-source, &__licenses-info {
      padding: 2.1rem;

      &__content {

        &__title {
          margin-bottom: 1.5rem;
        }

      }

      &--bg-gray {
        background-color: $gray-100;
      }

      &--bg-white {
        background-color: $white;
      }
    }

    &__data-source {

      &__content {

        &__item {

          @include media-breakpoint-down(md) {
            margin-bottom: 1.5rem;
          }

          &__name {
            color: $gray-700;
            text-align: center;
            margin: 10px 0;
          }
        }
      }
    }
  }
</style>
