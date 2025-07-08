import z from "zod";

export const UserShema = z.object({
  userName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
});

export type UserSchemaType = z.infer<typeof UserShema>;
