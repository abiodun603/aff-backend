import express, { RequestHandler } from "express";
import { deleteImage, generatePresignedURL, fileUploadMany } from "../services/file.service";

export const UploadBlogImage: RequestHandler = async(req: any, res: express.Response) => {
  try {
    // Check if the file is provided
    if (!req.files) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Upload the file
    const data = await fileUploadMany(req.files);

    // Generate the pre-signed URL
    // const presignedURL = await generatePresignedURL(result);

    // Return the result
    return res.status(200).json({ 
      status: "SUCCESS",
      message: "Request completed successfully",
      data
     });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error"})
  }
}

export const deleteFile: RequestHandler = async(req: any, res: express.Response) => {
  try {
    if(req.params.filename){
      // Upload file
      const result = await deleteImage(req.params.filename);

      return res.status(200).json({
        message: "Success",
        body: result
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error"})
  }
}

export const viewFile: RequestHandler = async (req, res) => {
  try {
    if(req.params.filename){
      // Upload file
      const result = await generatePresignedURL(req.params.filename);

      return res.status(200).json({
        message: "Success",
        body: result
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error"})
  }
}
