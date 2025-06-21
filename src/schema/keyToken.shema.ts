"use strict";
import { z } from "zod";

const keyTokenModelValidate = z.object({
    user_id: z.string(),
    access_token: z.string(),
    refresh_token: z.string(),
    privateKey: z.string(),
    publicKey: z.string()
});

export type KeyTokenTypeModel = z.infer<typeof keyTokenModelValidate>;

export { keyTokenModelValidate };
