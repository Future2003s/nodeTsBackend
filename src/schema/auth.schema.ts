import { z } from "zod";

const userValidation = z.object({
    name: z.string().min(1, "Tên không được để trống"),
    email: z.string().email("Email không hợp lệ"),
    age: z.number().int().positive("Tuổi phải là số nguyên dương")
});

export type UserTypeModel = z.infer<typeof userValidation>;

export { userValidation };
