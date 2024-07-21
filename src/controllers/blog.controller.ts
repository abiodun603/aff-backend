import express from 'express';
import BlogPostModel from '../db/models/blog.model';
import { get } from 'lodash';
import { Types } from 'mongoose';

async function createBlogPost ( req: express.Request, res: express.Response) {
  try {

    const { title, slug, category, content, images, status} = req.body

    // Safely retrieve the user's ID using lodash's get function
    const userId = get(req, 'identity._id');

    if(!title || !slug || !category  || !content || !images) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const blogPost = new BlogPostModel({
      title, slug, category, content, images, userId, status
    });

    blogPost.save()

    return res.status(200).json({
      status: "SUCCESS",
      message: "Request completed successfully",
      blogPost
    })
    
  } catch (error) {

    console.error("Error creating blog post:", error);
    return res.status(500).json({ message: "Internal Server Error"})

  }
}

async function getBlogPost (req: express.Request, res: express.Response) {
  try { 
    
    // Safely retrieve the user's ID using lodash's get function
    const userId = get(req, 'identity._id');

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is required' });
    }

    // Ensure the userId is a valid ObjectId
    const userObjectId = new Types.ObjectId(userId);

    const blogPost = await BlogPostModel.find({ userId: userObjectId }).populate({
      path: 'category',
      select: 'name color' 
    }) 
    .populate({
      path: 'userId',
      select: 'username' // Specify fields to select from the User model
    });

    if(!blogPost){
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.status(200).json({
      status: "SUCCESS",
      message: "Request completed successfully",
      blogPost
    })
    
  } catch (error) {

    console.log("Error getting blog post:", error);
    return res.status(500).json({ message: "Internal Server Error"})

  }
}

async function getProductById (req: express.Request, res: express.Response) {
  try {

    const productId = req.params?.id

    // Safely retrieve the user's ID using lodash's get function
    const userId = get(req, 'identity._id');

    if(!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is required' });
    }

    const productPost = await BlogPostModel.findById(productId)
      .populate({
        path: 'category',
        select: 'name color' 
      })
    
    if(!productPost){
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.status(200).json({
      status: "SUCCESS",
      message: "Request completed successfully",
      productPost
    });

  } catch (error) {

    console.log("Error getting blog post:", error);
    return res.status(500).json({ message: "Internal Server Error"})
    
  }
}
export {
  createBlogPost,
  getBlogPost,
  getProductById
}