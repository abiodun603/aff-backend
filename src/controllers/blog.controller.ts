import express from 'express';
import BlogPostModel from '../db/models/blog.model';
import { get } from 'lodash';

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

export {
  createBlogPost
}