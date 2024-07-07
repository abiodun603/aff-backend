import express, { RequestHandler } from "express";
import { uploadToS3 } from "../utils/uploadImageHelpers";
import config from "../config";

export const UploadBlogImage: RequestHandler = async(req: any, res: express.Response) => {
  try {
    if(req.files.blogPic.name){
      // Upload file
      const result = await uploadToS3(req.files.blogPic, config.aws.bucket);

      return result.status(201).json({
        message: "Success",
        body: result
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error"})
  }
}

