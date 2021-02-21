export const pro_token = "pro_token"; // token变量

export const ENV = process.env.NODE_ENV;

export const apiUrl = ENV === `development` ? `http://127.0.0.1:3333` : `http://121.4.113.48:3333`;

// 支付方式map
export const methodMap = {
  0: '货到付款',
  1: '微信',
  2: '支付宝',
  3: '线下支付'
}

export const sellStateMap = {
  1: '发货中',
  2: '已发货，待收货',
  3: "交易完成"
}
