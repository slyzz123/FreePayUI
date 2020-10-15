<template>
    <basic-container>
      <div style="text-align: center;">
        <el-row>
          <el-col :span="24"><h1>￥{{amount}}</h1></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><el-image style="width: 200px; height: 200px" :src="require('../../../assets/diandan/1.png')"></el-image></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><el-image style="width: 15%; height: 100%" :src="url"></el-image></el-col>
        </el-row>
      </div>
    </basic-container>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default {
  components: {
  },
  data() {
    return {
      amount: '100.00',
      url:require('../../../assets/diandan.png'),
    }
  },
  watch: {
  },
  created() {
    let money = this.$cookies.get("money"); //获取
    let payId = this.$cookies.get("payId");
    this.amount = money;
  }
  
}

</script>