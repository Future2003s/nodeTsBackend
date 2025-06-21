"use strict";
import { Schema, model } from "mongoose";
import { KeyTokenTypeModel } from "~/schema/keyToken.shema";

const KeyTokenModel = new Schema<KeyTokenTypeModel>(
    {
        user_id: { type: String, unique: true, required: true, ref: "User" },
        privateKey: { type: String, required: true },
        publicKey: { type: String, required: true },
        access_token: { type: String },
        refresh_token: { type: String }
    },
    {
        timestamps: true
    }
);

export default model<KeyTokenTypeModel>("KeyToken", KeyTokenModel);
