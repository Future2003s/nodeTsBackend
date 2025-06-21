"use strict";
import authModel from "~/model/auth.model";
import ErrorResponse from "~/response/error.response";
import { UserTypeModel } from "~/schema/auth.schema";
import crypto from "crypto";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import keyTokenModel from "~/model/keyToken.model";

class AccessService {
    public static async register(userRequest: UserTypeModel) {
        const findUser = authModel.exists({ name: userRequest.name }).lean();
        if (!findUser) throw new ErrorResponse(400, "Pls Login");

        // hash password
        const salt: string = await bcrypt.genSalt(10);
        const hashPassword: string = bcrypt.hashSync(userRequest.password, salt);

        // new user
        const newUser = await authModel.create({ ...userRequest, password: hashPassword });

        // privateKey,publicKey
        const publicKey: string = crypto.randomBytes(32).toString("hex");
        const privateKey: string = crypto.randomBytes(32).toString("hex");

        // payload JWT
        const payload = {
            _id: newUser._id,
            name: newUser.name,
            role: newUser.role
        };

        const access_token = await JWT.sign(payload, publicKey, {
            expiresIn: "4d"
        });

        const refresh_token = await JWT.sign(payload, privateKey, {
            expiresIn: "7d"
        });

        keyTokenModel.create({
            user_id:
        })

        return {
            data: newUser,
            token: {
                access_token,
                refresh_token
            }
        };
    }

    public static async login(data: any) {
        return data;
    }
}

export default AccessService;
