import { S3Client } from "@aws-sdk/client-s3";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner"
import { Hash } from '@smithy/hash-node'
import config from "./";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.access_key,
    secretAccessKey: config.aws.secret_key
  }
});



const s3Presigner = new S3RequestPresigner({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.access_key,
    secretAccessKey: config.aws.secret_key
  },
  sha256: Hash.bind(null, "sha256")
})


const s3Bucket = config.aws.bucket
const s3Region = config.aws.region

export {s3Client, s3Bucket,s3Region, s3Presigner}