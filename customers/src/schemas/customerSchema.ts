import z from "zod";

export const CreateCustomerSchema = z.object({
  name: z
    .string()
    .min(2, "Nome é obrigatório e deve ter pelo menos 2 caracteres"),
  salary: z.number().nonnegative("Salário deve ser um positivo"),
  companyValuation: z
    .number()
    .nonnegative("Valor da empresa deve ser positivo deve ser um positivo"),
});

export const UpdateCustomerSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  salary: z
    .number({ invalid_type_error: "Salário deve ser um número" })
    .min(1, "Salário não pode ser menor que 1"),
  companyValuation: z
    .number({ invalid_type_error: "Valor deve ser um número" })
    .min(1, "Valor da empresa não pode ser menor que 1"),
});

export type UpdateCustomerSchemaType = z.infer<typeof UpdateCustomerSchema>;
export type CreateCustomerSchemaType = z.infer<typeof CreateCustomerSchema>;
