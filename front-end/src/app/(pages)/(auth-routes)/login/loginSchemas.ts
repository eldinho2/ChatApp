import { z } from "zod";


export const registerSchema = z.object({
  userName: z
    .string()
    .min(4, { message: "Usuario deve ter pelo menos 4 caracteres" })
    .max(20, { message: "Usuario nao pode ser maior que 20 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 8 caracteres" })
    .max(20, { message: "A senha não pode ter mais que 20 caracteres" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 8 caracteres" })
    .max(20, { message: "A senha não pode ter mais que 20 caracteres" }),
});