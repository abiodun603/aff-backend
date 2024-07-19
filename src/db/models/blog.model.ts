import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./users";
import { ICategory } from "./category";

interface Image {
  location: string;
  fileName: string;
}


interface IBlogPost extends Document {
  title: string;
  slug: string;
  category: ICategory["_id"]
  tags: string[];
  content: string;
  images: Image[];
  userId: IUser["_id"]
  status: 'published' | 'draft';
  createdAt: Date
  updatedAt: Date
}

const ImageSchema = new Schema<Image>({
  location: { type: String, required: true },
  fileName: { type: String, required: true },
});

const BlogPostSchema: Schema = new Schema<IBlogPost>(
  {
     title: {
      type: String,
      required: true,
     },
     slug: {
      type: String,
      required: true,
      unique: true,
     },
     category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
     },
     tags: {
      type: [String]
     },
     content: {
      type: String,
      required: true,
     },
     images: {
      type: [ImageSchema],
      required: true,
     },
     userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
     },
     status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft"
     }
     
  }
)

const BlogPostModel = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPostModel