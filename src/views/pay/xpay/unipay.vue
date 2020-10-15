<template>
    <basic-container>
      <div style="text-align: center;">
        <el-row>
          <el-col :span="24"><span class="really">￥{{really}}&nbsp;</span><span class="should">￥{{amount}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="tip">云闪付支付优惠</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="timeFlag > 1">
            <el-image style="width: 200px; height: 200px" :src="require('../../../assets/unipay/custom.png')"></el-image>
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
      <el-dialog
        title="恭喜您获得支付优惠"
        :visible="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>支付时请在金额中输入支付：{{really}} 元即可，若输入错误可能会造成您支付失败！</span>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
        </span>
      </el-dialog>
    </basic-container>
</template>
<style>
    .really{
        font-size: 2em;
    }
    .should{
        font-size: 1em;
        text-decoration:line-through;
        color: #999;
    }
    .tip{
        font-size: 1em;
        color: #999;
    }
</style>

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
      really:'4.90',
      url:require('../../../assets/uni.png'),
      dialogVisible: true,
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
    this.really = Number(money) - 0.1;

    let time = this.$cookies.get("uniTime");
    if(time != null){
      this.time = Number(time);
    }
    if(this.time <= 1000){
      this.timeFlag = 1;
    }

  },
  methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleCountdownProgress(data) {
      this.timeFlag = data.totalSeconds;
      this.$cookies.set('uniTime', data.totalSeconds * 1000);
    },
  }
  
}

</script>