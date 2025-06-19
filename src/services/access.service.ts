"use strict";

import { UserTypeModel } from "~/schema/auth.schema";

class AccessService {
    public static async register(userRequest: UserTypeModel) {
        return userRequest;
    }

    public static async login(data: any) {
        return data;
    }
}

export default AccessService;
