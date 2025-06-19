import mongoose, { model } from "mongoose";
import { UserTypeModel } from "~/schema/auth.schema";

const UserModel = new mongoose.Schema<UserTypeModel>(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        age: { type: Number }
    },
    {
        timestamps: true
    }
);

export default model<UserTypeModel>("User", UserModel);
