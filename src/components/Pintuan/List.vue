<template>
  <div>
    <tab>
      <tab-item selected>拼团中</tab-item>
      <tab-item disabled></tab-item>
      <tab-item disabled></tab-item>
    </tab>
    <div class="invite-row vux-1px-b">
      <flexbox>
        <flexbox-item :span="3/10" class="vux-1px-r">
          <div class="remain-people">
            还差
            <span class="number">1</span>
            人
          </div>
          <div class="countdown">
            剩余：
            <clocker time="2017-09-21" format="%H : %M : %S">
            </clocker>
          </div>
        </flexbox-item>
        <flexbox-item>
          <img class="avatar" src="../../../static/pintuan/avatar@2x.png" alt="用户头像" />
          <img class="avatar" src="../../../static/pintuan/avatar-default@2x.png" alt="用户头像" />
        </flexbox-item>
        <flexbox-item>
          <x-button mini plain type="primary" class="btn" action-type="button" >直接参团</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="invite-row vux-1px-b">
      <flexbox>
        <flexbox-item :span="3/10" class="vux-1px-r">
          <div class="remain-people">
            还差
            <span class="number">1</span>
            人
          </div>
          <div class="countdown">
            剩余：
            <clocker time="2017-09-21" format="%H : %M : %S">
            </clocker>
          </div>
        </flexbox-item>
        <flexbox-item>
          <img class="avatar" src="../../../static/pintuan/avatar@2x.png" alt="用户头像" />
          <img class="avatar" src="../../../static/pintuan/avatar-default@2x.png" alt="用户头像" />
        </flexbox-item>
        <flexbox-item>
          <x-button mini plain type="primary" class="btn" action-type="button" >直接参团</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="invite-row vux-1px-b">
      <flexbox>
        <flexbox-item :span="3/10" class="vux-1px-r">
          <div class="remain-people">
            还差
            <span class="number">1</span>
            人
          </div>
          <div class="countdown">
            剩余：
            <clocker time="2017-09-21" format="%H : %M : %S">
            </clocker>
          </div>
        </flexbox-item>
        <flexbox-item>
          <img class="avatar" src="../../../static/pintuan/avatar@2x.png" alt="用户头像" />
          <img class="avatar" src="../../../static/pintuan/avatar-default@2x.png" alt="用户头像" />
        </flexbox-item>
        <flexbox-item>
          <x-button mini plain type="primary" class="btn" action-type="button" >直接参团</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import {
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Clocker,
  XButton
} from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Clocker,
    XButton
  },
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.invite-row {
  padding: 1em;
  font-size: 0.875rem;
  .remain-people {
    .number {
      font-size: 1rem;
    }
  }
  .countdown {
  }
  .avatar {
    width: 3em;
    height: 3em;
    margin-right: 2px;
  }
  .btn {
    color: @theme-color;
    border-color: @theme-color;
  }
}
</style>
