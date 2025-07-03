import mongoose, { model } from "mongoose";
import { ROLE } from "~/constants/enum";
import { UserTypeModel } from "~/schema/auth.schema";

const UserModel = new mongoose.Schema<UserTypeModel>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 8 },
    role: { type: String, enum: [ROLE.ADMIN, ROLE.USER], default: ROLE.USER },
    avatar: { type: String, default: " " },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"] },
    verify: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export default model("User", UserModel);
