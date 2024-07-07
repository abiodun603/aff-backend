import AWS from 'aws-sdk';
import config from '../config'

export const uploadToS3 = async(file: any, bucketName: string) => {
  try {
    
    const s3: AWS.S3 = new AWS.S3({
      credentials: {
        accessKeyId: config.aws.access_key,
        secretAccessKey: config.aws.secret_key
      }
    });

    const newFileName = `pic_${(Date.now()).toString()}.${file.minetype.split("/")[1]}`

    //Key is the file name we want to rename
    //our uploaded file with

    const params = {
      Bucket: bucketName,
      Key: newFileName,
      Body: file.data
    }
    /**
     *  We are returning a promise so we can
     * use async await in our controller when 
     * we are calling our uploadToS3 function
     */
    return new Promise((resolve, reject) => {
      s3.upload(params, {}, (err, data) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          console.log(data);
          resolve(data);
        }
      })
    })

  } catch (error) {
    console.log(error);
    return error;
  }
}