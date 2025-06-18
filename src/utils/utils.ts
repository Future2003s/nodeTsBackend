"use strict";
import crypto from "crypto";

const ramdomImage = (): string => {
    return crypto.randomBytes(16).toString("hex");
};

export { ramdomImage };
