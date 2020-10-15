<template>
  <basic-container>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="支付方式" prop="payType">
            <el-select v-model="ruleForm.payType" placeholder="请选择支付方式" style="width:100%">
              <el-option label="支付宝支付" value="Alipay"></el-option>
              <el-option label="微信支付" value="Wechat"></el-option>
              <el-option label="QQ钱包支付" value="QQ"></el-option>
              <el-option label="云闪付" value="UnionPay"></el-option>
              <!--
              <el-option label="支付宝点单支付" value="Diandan"></el-option>
              -->
              <el-option label="PayPal支付" value="PayPal"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="支付金额" prop="amount">
            <el-select v-model="ruleForm.amount" placeholder="请选择支付金额" style="width:100%">
              <el-option v-for="item in options" :key="item.value"
                  :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="留言" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入留言"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立刻支付</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </basic-container>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import { addXpayObj,paypal } from '@/api/pay/paytradeorder'

export default {
  components: {
    
  },
  data() {
    return {
      ruleForm: {
        nickName: '',
        amount: '',
        payType: '',
        email: '',
        desc: '',
        mobile:0,//支付设备是否为移动端
        device: navigator.userAgent,
      },
      time: 90,
      options: [{
          value: '0.01',
          label: '￥0.01'
        },{
          value: '1.00',
          label: '￥1.00'
        }, {
          value: '10.00',
          label: '￥10.00'
        }, {
          value: '2.00',
          label: '$ 2.00'
      }],
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
          //,{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请选择支付金额', trigger: 'change' }
        ],
        payType: [
          { required: true, message: '请选择支付方式', trigger: 'change' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          //{ pattern:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: "请输入正确的邮箱", trigger: "blur"}
        ],
        desc: [
          { required: false, message: '请填写留言', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
  },
  created() {
    this.isMobile();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let array = this.options;
          for(let index in array){
            let item = array[index];
            if(item.value == this.ruleForm.amount){
              if(this.ruleForm.payType=="PayPal" && item.label.indexOf('￥') > -1){
                this.$message({
                  showClose: true,
                  message: 'PayPal支付请使用美元支付',
                  type: 'error'
                })
                return;
              }else if(this.ruleForm.payType!="PayPal" && item.label.indexOf('$') > -1){
                this.$message({
                  showClose: true,
                  message: '选择PayPal以外支付方式请使用人民币支付',
                  type: 'error'
                })
                return;
              }
            }
          }
          
          //console.log(1,this.ruleForm);
          this.$cookies.set('money', this.ruleForm.amount);
          addXpayObj(this.ruleForm).then(data => {
            //console.log(2,data); 
            if(data.statusText == 'OK'){
              let payId = data.data.data.payTradeOrder.orderId;
              this.$cookies.set('payId', payId);
              if(this.ruleForm.payType=="Alipay"){
                  let flag = this.isAlipay();
                  if(flag){
                      let hostUrl = window.location.origin;
                      window.location.href="alipays://platformapi/startapp?appId=20000067&url="+
                          encodeURIComponent(hostUrl + "/pay/order/openAlipay.html?money="+money+"&num="+payId+"&id="+payId);
                  }else{
                      this.$cookies.set('aliTime', this.time * 1000);
                      this.$router.push('/pay/xpay/alipay')
                  }
              }else if(this.ruleForm.payType=="Wechat"){
                  this.$cookies.set('remark', data.data.data.remark);
                  this.$cookies.set('wechatUrl', data.data.data.wechatUrl);
                  this.$cookies.set('weTime', this.time * 1000);
                  this.$router.push('/pay/xpay/wechat')
              }else if(this.ruleForm.payType=="QQ"){
                  this.$cookies.set('qqTime', this.time * 1000);
                  this.$router.push('/pay/xpay/qqpay')
              }else if(this.ruleForm.payType=="UnionPay"){
                  this.$cookies.set('uniTime', this.time * 1000);
                  this.$router.push('/pay/xpay/unipay')
              }else if(this.ruleForm.payType=="Diandan"){
                  this.$router.push('/pay/xpay/diandan')
              }else if(this.ruleForm.payType=="PayPal"){
                this.resetForm('ruleForm');
                data.data.data.payTradeOrder.extra = window.location.origin;
                paypal(data.data.data.payTradeOrder).then(res => {
                  window.open(res.data);
                }).catch(() => {
                })
              }
            }
          }).catch(() => {
            
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 判断是否支付宝内打开
    isAlipay() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf("alipay")>=0) {
            return true;
        }
        return false;
    },
    //判断移动设备
    isMobile() {
        //console.log(window.location);
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            this.ruleForm.mobile=1;
        }
    },
  }
}
</script>
