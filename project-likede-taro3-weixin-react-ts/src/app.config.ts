export default {
  pages: [
    'pages/index/index',
    'pages/sku_list/index',
    'pages/vending_machine_list/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f2dd41',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  subpackages: [
    {
      root: 'pages/sku_detail/',
      pages: ['index']
    },
    {
      root: 'pages/pay_success/',
      pages: ['index']
    },
    {
      root: 'pages/order_list/',
      pages: ['index']
    },
    {
      root: 'pages/order_detail/',
      pages: ['index']
    },
    {
      root: 'pages/calendar_select/',
      pages: ['index']
    }
  ],
  plugins: {
    routePlan: {
      version: '1.0.10',
      provider: 'wx50b5593e81dd937a'
    }
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序定位'
    }
  }
}
