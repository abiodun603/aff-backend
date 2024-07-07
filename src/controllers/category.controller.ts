import express from 'express'
import Category from '../db/models/category';
import { get } from 'lodash';


export const createCategory = async (req: express.Request, res: express.Response) => {
  try {
    const {name, color} = req.body;
    
     // Safely retrieve the user's ID using lodash's get function
     const userId = get(req, 'identity._id');

    if (!name || !color) {
      return res.status(400).json({ message: 'Name and color are required' });
    }

    if (!userId) {
      return res.sendStatus(403);
    }


    const category = new Category({name, color, userId});

    await category.save();

    return res.status(201).json(category)
  } catch (err) {

    console.error('Error creating category:', err);
    return res.status(500).json({ message: "Internal Server Error"})
    
  }
}

export const getCategoryForUser = async (req: express.Request, res: express.Response) => {

  try {
    // Safely retrieve the user's ID using lodash's get function
    const userId = get(req, 'identity._id');

    if (!userId) {
      return res.sendStatus(403);
    }

    // fetch category belonging to the logged in user
    const categories = await Category.find({userId})

    return res.status(200).json(categories);

  } catch (err) {
    console.error('Error creating category:', err);
    return res.status(500).json({ message: "Internal Server Error"})
  }

}