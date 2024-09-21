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
  states: z
    .array(z.string())
    .min(1, { message: "Please select atleast one state." })
    .max(2, { message: "You cannot select more than two states" }),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
  skills: z.array(z.string()).max(2, {
    message: "You can only select a maximum of 2 skills"
  }),
});

export type Schema = z.infer<typeof schema>

export const schemaDefaultValues: Schema = {
  name: "",
  age: 0,
  email: "",
  states: [],
  languagesSpoken: [],
  gender: '',
  skills: [],
};