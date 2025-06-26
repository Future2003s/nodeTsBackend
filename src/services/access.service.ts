"use strict";
import authModel from "~/model/auth.model";
import ErrorResponse from "~/response/error.response";
import { UserTypeModel } from "~/schema/auth.schema";
import crypto from "crypto";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import KeyTokenService from "./keyToken.service";
import keyTokenModel from "~/model/keyToken.model";

class AccessService {
    public static async register(userRequest: UserTypeModel) {
        const findUser = await authModel.exists({ name: userRequest.name }).lean();

        if (findUser) {
            throw new ErrorResponse(400, "Pls Login");
        }

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

        await KeyTokenService.handleKeyToken({
            user_id: String(newUser._id),
            access_token,
            refresh_token,
            privateKey,
            publicKey
        });

        return {
            data: newUser,
            token: {
                access_token,
                refresh_token
            }
        };
    }

    public static async login(data: any) {
        const findUser = await authModel.findOne({ email: data.email }).lean();

        if (!findUser) {
            throw new ErrorResponse(400, "Pls Register Account");
        }

        // payload JWT
        const payload = {
            _id: findUser._id,
            name: findUser.name,
            role: findUser.role
        };

        const token = await keyTokenModel.findOne({
            user_id: findUser._id
        });

        if (!token) {
            throw new ErrorResponse(400, "Error find token !!!");
        }

        const access_token = await JWT.sign(payload, token.publicKey, {
            expiresIn: "4d"
        });

        const refresh_token = await JWT.sign(payload, token.privateKey, {
            expiresIn: "7d"
        });

        await KeyTokenService.handleKeyToken({
            user_id: findUser._id,
            access_token,
            privateKey: token.privateKey,
            publicKey: token.publicKey,
            refresh_token: refresh_token
        });

        return {
            data: findUser,
            token: {
                access_token,
                refresh_token
            }
        };
    }
}

export default AccessService;
