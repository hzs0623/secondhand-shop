// 上传oss
import COS from 'cos-js-sdk-v5';
import { getOssConfig } from '@/api/init';

const Config = {
  Bucket: 'daes-1251985304',// 存储桶的名称
  Region: 'ap-shanghai',  /* 存储桶所在地域，必须字段 */
};

const keyBase = `shop/image/`;  // 上传文件 路径



/**
 * 请求体
 */
export const uploadSdk = async (fileObject) => {
  let { name } = fileObject;
  const url = `${keyBase}${Date.now()}${name}`;

  const cos = new COS({
    getAuthorization: async function (_, callback) {
      // 异步获取临时密钥
      const data = await getOssConfig({
        key: url // 文件名字
      });

      const credentials = data && data.credentials;
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        XCosSecurityToken: credentials.sessionToken,
        ExpiredTime: data.expiredTime
      })
    }
  });
  return new Promise((res, rej) => {
    // 上传
    cos.putObject({
      Bucket: Config.Bucket, /* 必须 */
      Region: Config.Region,     /* 存储桶所在地域，必须字段 */
      Key: url,      /* shop/image/文件下 取name 必须 */
      StorageClass: 'STANDARD',
      Body: fileObject, // 上传文件对象

      onProgress: function (progressData) {
        // 上传过程
      }
    }, function (err) {
      if (err) return rej(err);
      // 获取url 地址
      cos.getObjectUrl({
        Bucket: Config.Bucket,
        Region: Config.Region,     /* 存储桶所在地域，必须字段 */
        Key: url,
        Sign: false,
      }, function (err, data) {
        if (err) {
          return rej(err);
        }
        res(data.Url);
      });
    });
  })

}
