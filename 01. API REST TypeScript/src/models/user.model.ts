import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "Descripción por defecto"
    },
  },
  {
    versionKey: false,
    timestamps: true
  },
);

const UserModel = model("users", UserSchema);
export default UserModel;