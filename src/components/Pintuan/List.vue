<template>
  <div>
    <!-- <tab>
      <tab-item selected>拼团中</tab-item>
      <tab-item disabled></tab-item>
      <tab-item disabled></tab-item>
    </tab> -->
    <div v-for="group in pintuanAllGroup" :key="group.actEntityId" class="invite-row vux-1px-b">
      <flexbox>
        <flexbox-item :span="3/10" class="vux-1px-r">
          <div class="remain-people">
            还差
            <span class="number">{{ group.groupRequireMember - group.groupNowMember }}</span>
            人
          </div>
          <div class="countdown">
            剩余：
            <clocker :time="formatDate(new Date(new Date(group.startDateTime).getTime() + (group.entityTimeOut * 60 * 60 * 1000)))" format="%H : %M : %S">
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
import {
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Clocker,
  XButton,
  dateFormat
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
      'getPintuanAllGroup'
    ]),
    clickJoin (group) {
      this.$router.push({
        name: 'PintuanProduct',
        query: {
          actEntityId: group.actEntityId
        }
      })
      console.log(group)
    },
    clickInvite (group) {
      console.log(group)
    },
    formatDate (time) {
      return dateFormat(time, 'YYYY-MM-DD')
    }
  },
  created () {
    const z = this
    z.getPintuanAllGroup({
      status: 1
    }).then(function (allGroups) {
      // z.allGroups = allGroups
    })
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
    margin-right: 2px;
    border-radius: 1.5em;
  }
  .btn {
    color: @theme-color;
    border-color: @theme-color;
  }
}
</style>
