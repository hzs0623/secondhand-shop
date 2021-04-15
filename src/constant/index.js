export const pro_token = "pro_token" // token变量

export const ENV = process.env.NODE_ENV

export const apiUrl =
  ENV === `development` ? `http://127.0.0.1:3333` : `http://121.4.113.48:3333`
