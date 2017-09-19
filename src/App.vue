<template>
  <div id="app">
    <router-view></router-view>
    <toast v-model="toast.show" :time="toast.time" :type="toast.type" width="12em" @on-hide="hideToast">
      <div class="toast-text">{{ toast.text }}</div>
    </toast>
    <loading :show="loading.show" :text="loading.text"></loading>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { WechatPlugin, Toast, Loading } from 'vux'

Vue.use(WechatPlugin)

export default {
  name: 'app',
  components: {
    Toast,
    Loading
  },
  computed: {
    ...mapState([
      'toast',
      'loading'
    ])
  },
  methods: {
    ...mapMutations([
      'hideToast'
    ])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

.toast-text {
  padding: 0 1em;
}
</style>
