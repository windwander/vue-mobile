<template>
  <div class="content-box">
    <div class="func-one">
      <p class="func-title">方法一</p>
      <ul>
        <li>拼团成功后，系统自动发放计次卡</li>
        <li>进入慧驾公众号</li>
        <li>点击“慧洗车”中的“立即预约”</li>
        <li>选择服务车型（注意与拼团购买的服务一致）</li>
        <li>下单</li>
        <li>美车师上门服务</li>
        <li>服务完成后选择计次卡支付</li>
      </ul>
    </div>
    <div class="func-two">
      <p class="func-title">方法二</p>
      <ul>
        <li><span style="color: #0084e0;">各大应用市场搜索慧驾汽车网，</span>即刻下载慧驾下载慧驾汽车网APP体验服务</li>
        <li>可在我的>计次卡中查看所购服务类型</li>
        <li>点击首页“上门洗车”</li>
        <li>选择服务车型（注意与拼团购买的服务一致）</li>
        <li>下单</li>
        <li>美车师上门服务</li>
        <li>服务完成后选择计次卡支付</li>
      </ul>
    </div>
    <div class="qr-img">
      <img src="~static/pintuan/qr-ha@2x.png" class="qr-gzh" />
      <p>扫码关注公众号</p>
    </div>
    <div class="copy">最终解释权归慧驾所有</div>
  </div>
</template>
<script>

</script>
<style>
  .content-box {
    padding: 1em;
  }
  .func-one {
    margin-bottom: 2em;
  }
  .func-title {
    font-size: 1rem;
    font-weight: bold;
    color: #151515;
    text-align: center;
  }
  ul {
    margin: 0.8em auto 0;
    width: 20em;
    padding-left: 1.2em;
    font-size: 0.875rem;
    color: #666;
  }
  .qr-img {
    text-align: center;
    margin-top: 1.5em;
    margin-bottom: 2em;
  }
  .qr-img .qr-gzh {
    width: 7em;
    height: 7em;
    margin-bottom: 0.5em;
  }
  .qr-img p {
    font-size: 1rem;
    font-weight: bold;
    color: #151515;
  }
  .copy {
    font-size: 0.625rem;
    color: #666;
    text-align: center;
  }
</style>
