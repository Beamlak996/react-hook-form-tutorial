import { z } from "zod"

export const schema = z.object({
  name: z.string().min(1, {
    message: "Name is required. Please provide your name.",
  }),
  age: z.coerce
    .number({
      required_error: "Age is required.",
      invalid_type_error: "Age must be a valid number.",
    })
    .int({ message: "Age must be a natural number." })
    .min(1, { message: "Age must be at least 1." }) 
    .max(120, { message: "Age must be less than 120." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
});

export type Schema = z.infer<typeof schema>

export const schemaDefaultValues: Schema = {
    name: "",
    age: 0,
    email: ""
}