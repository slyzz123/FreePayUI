<template>
    <basic-container>
      <div style="text-align: center;">
        <el-row>
          <el-col :span="24"><h1>￥{{amount}}</h1></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="timeFlag > 1">
            <qrcode :value="msg" style="width: 200px; height: 200px"/>
          </el-col>
          <el-col :span="24" v-if="timeFlag <= 1">
            <el-image style="width: 200px; height: 200px" :src="tourl"></el-image>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><el-image style="width: 15%; height: 100%" :src="url"></el-image></el-col>
        </el-row>
        <countdown :time="time" @progress="handleCountdownProgress">
          <template slot-scope="props">请于 {{ props.minutes }} 分 {{ props.seconds }} 秒 内支付</template>
        </countdown>
      </div>
    </basic-container>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VueCountdown from '@chenfengyuan/vue-countdown';
Vue.component(VueCountdown.name, VueCountdown);
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  components: {
    'qrcode': VueQrcode
  },
  data() {
    return {
      amount:0,
      msg: '',
      options: {
        height: 200,
        width: 200
      },
      url:require('../../../assets/alipay@2x.png'),
      tourl:require('../../../assets/timeout.png'),
      time:1.5 * 60 * 1000,
      timeFlag:2
    }
  },
  watch: {
  },
  created() {
    debugger;
    let money = this.$cookies.get("money"); //获取
    let payId = this.$cookies.get("payId");
    let time = this.$cookies.get("aliTime");
    if(time != null){
      this.time = Number(time);
    }
    if(this.time <= 1000){
      this.timeFlag = 1;
    }
    this.amount = money;
    let hostUrl = window.location.origin;
    let url = "alipays://platformapi/startapp?appId=20000067&url="+
        encodeURIComponent(hostUrl + "/pay/order/openAlipay.html?money="+money+"&num="+payId+"&id="+payId);

    this.msg = url;
  },
  methods: {
    handleCountdownProgress(data) {
      this.timeFlag = data.totalSeconds;
      this.$cookies.set('aliTime', data.totalSeconds * 1000);
    },
  }
  
}

</script>