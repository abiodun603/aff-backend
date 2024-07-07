import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./users";

// Define the interface for the blog model
export interface ICategory extends Document {
  name: string;
  color: string;
  userId: IUser["_id"]
}

// Define the schema for the category model
const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category
