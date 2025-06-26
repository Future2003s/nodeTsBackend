import { z } from "zod";
import { ROLE, STATUS } from "~/constants/enum";

const userModelLoginValidation = z.object({
    email: z.string().min(4, "Name required 4 character"),
    password: z.string().min(8, "Password requried 8 character")
});

const userModelValidate = z.object({
    name: z.string().min(4, "Name required 4 character"),
    email: z.string().email("Email INVALID !!!"),
    password: z.string().min(8, "Password required 8 character"),
    role: z.enum([ROLE.USER, ROLE.ADMIN]).default(ROLE.USER),
    avatar: z.string().default(" "),
    status: z.enum([STATUS.ACTIVE, STATUS.INACTIVE]),
    verify: z.boolean()
});

export type UserTypeModel = z.infer<typeof userModelValidate>;

export type UserTypeModelLogin = z.infer<typeof userModelLoginValidation>;

export { userModelValidate, userModelLoginValidation };
