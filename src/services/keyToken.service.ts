"use strict";
import keyTokenModel from "~/model/keyToken.model";

interface RequestKeyToken {
    user_id: any;
    access_token: string;
    refresh_token: string;
    privateKey: string;
    publicKey: string;
}

class KeyTokenService {
    public static async handleKeyToken({ user_id, access_token, privateKey, publicKey }: RequestKeyToken) {
        const filter: { user_id: any } = {
            user_id
        };

        const update: { privateKey: string; publicKey: string; access_token: string } = {
            access_token,
            privateKey,
            publicKey
        };

        return keyTokenModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        });
    }
}

export default KeyTokenService;
