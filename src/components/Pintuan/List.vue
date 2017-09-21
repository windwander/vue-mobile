<template>
  <div>
    <!-- <tab>
      <tab-item selected>拼团中</tab-item>
      <tab-item disabled></tab-item>
      <tab-item disabled></tab-item>
    </tab> -->
    <div v-for="group in pintuanAllGroup" :key="group.actEntityId" class="invite-row vux-1px-b">
      <flexbox>
        <flexbox-item :span="2/5" class="vux-1px-r">
          <div class="remain-people">
            还差
            <span class="number">{{ group.groupRequireMember - group.groupNowMember }}</span>
            人
          </div>
          <div class="countdown">
            剩余：
            <clocker v-if="group.startDateTime" :time="formatDate(group.startDateTime, group.entityTimeOut)" format="%H : %M : %S">
            </clocker>
          </div>
        </flexbox-item>
        <flexbox-item>
          <img class="avatar" v-for="(url, index) in group.picturl" :key="index" :src="url || '~static/pintuan/avatar-default@2x.png'" alt="用户头像'" />
        </flexbox-item>
        <flexbox-item>
          <x-button v-if="group.isjoin === '0'" mini plain type="primary" class="btn" action-type="button" @click.native="clickJoin(group)">直接参团</x-button>
          <x-button v-if="group.isjoin === '1'" mini plain type="primary" class="btn" action-type="button" @click.native="clickInvite(group)">邀请好友</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import sha1 from 'crypto-js/sha1'
import {
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Clocker,
  XButton,
  dateFormat,
  querystring
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
    return {
      // allGroups: {}
    }
  },
  computed: {
    ...mapState([
      'pintuanAllGroup'
    ])
  },
  methods: {
    ...mapActions([
      'getPintuanAllGroup',
      'getWxTicket',
      'getWxOpenId'
    ]),
    clickJoin (group) {
      this.$router.push({
        name: 'PintuanProduct',
        query: {
          actEntityId: group.actEntityId,
          autoJoin: true
        }
      })
    },
    clickInvite (group) {
      sessionStorage.setItem('showShareBox', true)
      this.$router.push({
        name: 'PintuanProduct',
        query: {
          actEntityId: group.actEntityId
        }
      })
    },
    formatDate (startDateTime, entityTimeOut) {
      let start = new Date(dateFormat(startDateTime, 'YYYY-MM-DDTHH:mm:ss')).getTime()
      let timeout = entityTimeOut * 60 * 60 * 1000
      let end = start + timeout
      return dateFormat(end, 'YYYY-MM-DD HH:mm:ss')
    },
    randomStr (len) {
      len = len || 32
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl, 9gq, Vv, Uu, I1
      let maxPos = chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    initWxTicket () {
      const z = this
      z.getWxTicket().then(function (t) {
        z.appId = t.appid
        z.ticket = t.ticket
        let isMicroMessenger = navigator.userAgent.toLowerCase().indexOf('MicroMessenger'.toLowerCase()) > -1
        if (isMicroMessenger && !querystring.parse().code) {
          let redirUri = encodeURIComponent(window.location.href)
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + z.appId + '&redirect_uri=' + redirUri + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
        } else {
          z.initWxConfig()
        }
        console.log(t)
      }).catch(function () {
        // 清除失效的微信code
        location.search = ''
      })
    },
    initWxConfig () {
      const z = this
      let noncestr = z.randomStr(16)
      let timestamp = new Date().getTime().toString().substr(0, 10)
      let url = decodeURIComponent(location.href).split('#')[0]
      let signStr = 'jsapi_ticket=' + z.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url
      let signature = sha1(signStr).toString()
      z.$wechat.config({
        debug: false, // 开发者工具显示详情
        appId: z.appId,
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: [
          'hideAllNonBaseMenuItem'
        ]
      })
      z.$wechat.ready(function () {
        z.$wechat.hideAllNonBaseMenuItem()
      })
      z.$wechat.error(function (res) {
        console.log(res)
        z.showToast({
          type: 'warn',
          text: '微信权限验证配置失败'
        })
      })
    }
  },
  created () {
    const z = this
    z.getPintuanAllGroup({
      status: 1
    }).then(function (allGroups) {
      // z.allGroups = allGroups
    })
    z.initWxTicket()
  },
  mounted () {
    console.log(this.pintuanAllGroup)
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
    margin-right: -1.5em;
    border-radius: 1.5em;
    box-shadow: 0 0 0.5em 0px #333;
  }
  .btn {
    color: @theme-color;
    border-color: @theme-color;
  }
}
</style>
