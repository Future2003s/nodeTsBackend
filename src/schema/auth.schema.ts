import { z } from "zod";
import { ROLE, STATUS } from "~/constants/enum";

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

export { userModelValidate };
