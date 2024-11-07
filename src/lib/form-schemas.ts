import { z } from "zod";
export const SignupFormSchema = z
	.object({
		firstName: z.string().min(1, { message: "First name is required" }).max(20).trim(),
		lastName: z.string().max(20).trim(),
		username: z.string().min(1, { message: "username is required" }).trim().toLowerCase(),
		email: z.string().email().min(1, { message: "Email is required" }),
		password: z.string().min(1, { message: "Password is required" }),
		confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
		terms: z.boolean(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type SignupFormType = z.infer<typeof SignupFormSchema>;
