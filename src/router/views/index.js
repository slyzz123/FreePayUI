import Layout from '@/page/index/'

export default [{
  path: '/alipay',
  component: Layout,
  redirect: '/pay/xpay/alipay',
  children: [{
    path: '/pay/xpay/alipay',
    name: '支付宝支付',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/pay/xpay/alipay')
  }]
},{
  path: '/wechat',
  component: Layout,
  redirect: '/pay/xpay/wechat',
  children: [{
    path: '/pay/xpay/wechat',
    name: '微信支付',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/pay/xpay/wechat')
  }]
},{
  path: '/qqpay',
  component: Layout,
  redirect: '/pay/xpay/qqpay',
  children: [{
    path: '/pay/xpay/qqpay',
    name: 'QQ钱包支付',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/pay/xpay/qqpay')
  }]
},{
  path: '/unipay',
  component: Layout,
  redirect: '/pay/xpay/unipay',
  children: [{
    path: '/pay/xpay/unipay',
    name: '云闪付',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/pay/xpay/unipay')
  }]
},{
  path: '/diandan',
  component: Layout,
  redirect: '/pay/xpay/diandan',
  children: [{
    path: '/pay/xpay/diandan',
    name: '支付宝点单支付',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/pay/xpay/diandan')
  }]
}]
