"use strict";

import { z } from "zod";

const keyTokenModelValidate = z.object({
    access_token: z.string()
});

export type KeyTokenTypeModel = z.infer<typeof keyTokenModelValidate>;

export { keyTokenModelValidate };
