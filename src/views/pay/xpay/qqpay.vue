<template>
    <basic-container>
      <div style="text-align: center;">
        <el-row>
          <el-col :span="24"><h1>￥{{amount}}</h1></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="timeFlag > 1">
            <el-image style="width: 200px; height: 200px" :src="require('../../../assets/qqpay/'+amount+'.png')"></el-image>
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

export default {
  components: {
  },
  data() {
    return {
      amount: '100.00',
      url:require('../../../assets/qqpay.png'),
      tourl:require('../../../assets/timeout.png'),
      time:1.5 * 60 * 1000,
      timeFlag:2
    }
  },
  watch: {
  },
  created() {
    let money = this.$cookies.get("money"); //获取
    let payId = this.$cookies.get("payId");
    this.amount = money;

    let time = this.$cookies.get("qqTime");
    if(time != null){
      this.time = Number(time);
    }
    if(this.time <= 1000){
      this.timeFlag = 1;
    }
  },
  methods: {
    handleCountdownProgress(data) {
      this.timeFlag = data.totalSeconds;
      this.$cookies.set('qqTime', data.totalSeconds * 1000);
    },
  }
  
}

</script>