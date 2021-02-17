// 上传oss
import COS from 'cos-js-sdk-v5';

const Config = {
  Bucket: 'daes-1251985304',// 存储桶的名称
  Region: 'ap-shanghai',  /* 存储桶所在地域，必须字段 */
  secretId: 'AKIDd4F7nC6AolTuUptjhSzHJ5ZrugdLnymM', // key
  secretKey: 'jdTpa5MRL5f1Qu86n7Reklx0sMCuZEpb', // 腾讯云 key
};

const keyBase = `shop/image`;  // 上传文件 路径

/**
 * 请求体
 */
export const upload = (fileObject) => {

  const { name } = fileObject;

  const cos = new COS({
    SecretId: Config.secretId,
    SecretKey: Config.secretKey,
  })

  return new Promise((res, rej) => {
    // 上传
    cos.putObject({
      Bucket: Config.Bucket, /* 必须 */
      Region: Config.Region,     /* 存储桶所在地域，必须字段 */
      Key: keyBase + name,      /* shop/image/文件下 取name 必须 */
      StorageClass: 'STANDARD',
      Body: fileObject, // 上传文件对象

      onProgress: function (progressData) {
        // 上传过程
      }
    }, function (err, data) {
      if (err) return rej(err);

      // 获取url 地址
      cos.getObjectUrl({
        Bucket: Config.Bucket,
        Region: Config.Region,     /* 存储桶所在地域，必须字段 */
        Key: keyBase + name,
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
