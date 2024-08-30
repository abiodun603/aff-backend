import mongoose, { Document, Model } from "mongoose";

interface IAuthentication {
  salt: string;
  sessionToken: string;
  password: string;
}

// Define the interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  authentication: IAuthentication;
  firstName: string;
  lastName: string;
}


const UserSchema = new mongoose.Schema<IUser>({
  username: { 
    type: String, 
  },
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    required: true 
  },
  authentication: {
    password: { 
      type: String, 
      required: true, 
      select: false 
    },
    salt: { 
      type: String, 
      select: false 
    },
    sessionToken: { 
      type: String, 
      select: false 
    }
  }
})

export const UserModel = mongoose.model<IUser>('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) =>  UserModel.findOne({ email})
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 
  'authentication.sessionToken': sessionToken
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user)=> user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete(
  { _id: id}
);
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)