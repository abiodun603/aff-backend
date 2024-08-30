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

    const productPost = new BlogPostModel({
      title, slug, category, content, images, userId, status
    });

    productPost.save()

    return res.status(200).json({
      status: "SUCCESS",
      message: "Request completed successfully",
      productPost
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

    const productPost = await BlogPostModel.find({ userId: userObjectId }).populate({
      path: 'category',
      select: 'name color' 
    }) 
    .populate({
      path: 'userId',
      select: 'username' // Specify fields to select from the User model
    });

    if(!productPost){
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.status(200).json({
      status: "SUCCESS",
      message: "Request completed successfully",
      productPost
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

async function updateProductPost(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const  { title, slug, category, content, status } = req.body;

  const userId = get(req, 'identity._id');

  try {

    const productPost = await BlogPostModel.findById(id);

    if (!productPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (!userId) {
      return res.status(403).json({ message: "You are not authorized to update this blog post" });
    }

    productPost.title = title || productPost.title;
    productPost.slug = slug || productPost.slug;
    productPost.category = category || productPost.category;
    productPost.content = content || productPost.content;
    productPost.status = status || productPost.status;

    await productPost.save();

    return res.status(200).json({
      status: "SUCCESS",
      message: "Product post updated successfully",
      productPost,
    });

  } catch (error) {
    console.log("Error updating product:", error);
    return res.status(500).json({ message: "Internal Server Error"})
  }
}

async function deleteProductPost(req: express.Request, res: express.Response){
 const { id } = req.params;

 const userId = get(req, 'identity._id');


 if (!userId) {
  return res.status(403).json({ message: "You are not authorized to update this blog post" });
}

 try {
  const product = await BlogPostModel.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  await BlogPostModel.findByIdAndDelete(id)

  return res.status(200).json({
    status: "SUCCESS",
    message: "Blog post deleted successfully",
  });

 } catch (error) {
    console.log("Error deleting product:", error);
    return res.status(500).json({ message: "Internal Server Error"})

 }
}

async function productCount(req: express.Request, res: express.Response){
  try {
    const counts = await BlogPostModel.aggregate([
      {
        $facet: {
          totalProducts: [{ $count: "count"}],
          publishedProducts: [{ $match: { status: "published"}}, { $count: "count"}],
          draftProducts: [{ $match: { status: "draft"}}, { $count: "count"}]
        }
      },
      {
        $project: {
          totalProducts: {
            $arrayElemAt: ["$totalProducts.count", 0]
          },
          publishedProducts: {
            $first: ["$publishedProducts.count", 0]
          },
          draftProducts: {
            $arrayElemAt: ["$draftProducts.count", 0]
          }
        }
      }
    ]);
    
    return res.status(200).json({
      status: "SUCCESS",
      message: "Request completed successfully",
      data: counts[0]
    })
  } catch (error) {

    console.log("Error getting product counts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
}

export {
  createBlogPost,
  getBlogPost,
  getProductById,
  productCount,
  updateProductPost,
  deleteProductPost
}