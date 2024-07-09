import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3, S3Client } from '@aws-sdk/client-s3'
import { s3Bucket, s3Client, s3Presigner, s3Region } from '../config/s3.config'
import { randomUUID } from "crypto";
import fs from "fs/promises";
import url from "url";
import sharp from "sharp";
import { parseUrl } from '@smithy/url-parser'
import { HttpRequest } from "@smithy/protocol-http"
import { formatUrl } from "@aws-sdk/util-format-url"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

async function uploadPicture(
  file: any, 
): Promise<string> {
  const {} = file
  try {

    //Key is the file name we want to rename our uploaded file with
    const newFileName = `aff_/${randomUUID()}.${file.mimetype.split("/")[1]}`

    const bucketParams = {
      Bucket: s3Bucket,
      Key: newFileName,
      Body: file.buffer,
      contentType: file.mimetype,
    };

    const command = new PutObjectCommand(bucketParams)

    await s3Client.send(command);

    return bucketParams.Key;
    
  } catch (error) {

    console.log(error);
    return error;
    
  }
}

async function generatePresignedURL(filename: string): Promise<string> {

  try {

    const url = parseUrl(`https://${s3Bucket}.s3.${s3Region}.amazonaws.co/${filename}`)

    const command = new GetObjectCommand({
      Bucket: s3Bucket,
      Key: filename,
    });

    const presignedUrlObj = await s3Presigner.presign(new HttpRequest({
      ...url, method: "GET"
    }))

    const presignedUrl = await getSignedUrl(s3Client,command, { expiresIn: 3600 });

    // return formatUrl(presignedUrlObj)

    return presignedUrl
  } catch (error) {
    console.log(error);
    return error;
  }

}

async function deleteImage(filename: string) {
  try {

    const bucketParams = {
      Bucket: s3Bucket,
      Key: filename,
    };

    return await s3Client.send(new DeleteObjectCommand(bucketParams))

  } catch (error) {
    console.error(`Failed to delete image  from S3: ${error}`);

    return error;
  }
}

// To use deleteImage for example:
// const imageKey = "path/to/image.jpg";
// await deleteImage(imageKey);
// console.log("Image deleted successfully.");

// Define the function to delete images from S3 (replace with your implementation)
async function deleteImagesFromStorage(imageUrls: string[]){
  for(const imageUrl of imageUrls){

     // Parse the URL to get the pathname, which represents the object key
    const parsedUrl = url.parse(imageUrl);
    const objectKey = parsedUrl.pathname?.substring(1);
    
    if(objectKey){
      const bucketParams = {
        Bucket:s3Bucket,
        Key: objectKey
      }

      try {
        await s3Client.send(new DeleteObjectCommand(bucketParams))
        console.log(`Image '${objectKey}' deleted from S3.`);
      } catch (error) {
        console.error(
          `Failed to delete image '${objectKey}' from S3: ${error}`
        );
      }
    }else {
      console.error(`Invalid image URL: ${imageUrl}`);
    }
  }
}

async function reduceImageSize(file: any): Promise<string> {

  await sharp(file.buffer)
  .resize({width: 1920, height: 1080, fit: "contain"})
  .toBuffer();

  return "";
}

export {
  uploadPicture,
  deleteImage,
  deleteImagesFromStorage,
  reduceImageSize,
  generatePresignedURL
};

