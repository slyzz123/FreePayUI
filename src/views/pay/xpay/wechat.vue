<template>
    <basic-container>
      <div style="text-align: center;">
        <el-row>
          <el-col :span="24"><h1>￥{{amount}}</h1></el-col>
        </el-row>
        <!--
        <el-row>
          <el-col :span="24"><h3>{{remark}}</h3></el-col>
        </el-row>
        -->
        <el-row>
          <el-col :span="24" v-if="timeFlag > 1">
            <qrcode :value="msg" :options="options"/>
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

import { updatePayObj } from '@/api/pay/paytradeorder'

export default {
  components: {
    'qrcode': VueQrcode
  },
  data() {
    return {
      amount: '100.00',
      msg: '',
      remark: '',
      payId: '',
      url:require('../../../assets/weixinpay@2x.png'),
      tourl:require('../../../assets/timeout.png'),
      time:1.5 * 60 * 1000,
      timeFlag:2,
      options: {
        height: 200,
        width: 200
      }
    }
  },
  watch: {
  },
  created() {
    let money = this.$cookies.get("money"); //获取
    let payId = this.$cookies.get("payId");
    let wechatUrl = this.$cookies.get("wechatUrl");
    let remark = this.$cookies.get("remark");
    this.amount = money;
    this.msg = wechatUrl;
    this.remark = remark;
    this.payId = payId;

    let time = this.$cookies.get("weTime");
    if(time != null){
      this.time = Number(time);
    }
    if(this.time <= 1000){
      this.timeFlag = 1;
    }
  },
  mounted() {
    //浏览器/页面关闭时解除二维码占用
    //关闭执行onunload
    
    window.onunload = function (e) {
        let payId = this.$cookies.get("payId");
        updatePayObj(payId).then(data => {
        }).catch(() => {
        })
        return;
    };
    
    /**
    //刷新 + 关闭 执行
    window.onbeforeunload = function () {
        let payId = this.$cookies.get("payId");
        updatePayObj(payId).then(data => {
        }).catch(() => {
        })
        return;
    };
    */
  
    /**
    * 火狐onbeforeunload 刷新执行，关闭不执行;onunload 刷新不执行，关闭不执行
    */
  },
  methods: {
    handleCountdownProgress(data) {
      this.timeFlag = data.totalSeconds;
      this.$cookies.set('weTime', data.totalSeconds * 1000);
      if(data.totalSeconds == 1){
        updatePayObj(this.payId).then(data => {
        }).catch(() => {
        })
      }
    },
  },
  
}

</script>