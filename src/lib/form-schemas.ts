import { z } from "zod";

// Signup form schema
export const SignupFormSchema = z
	.object({
		firstName: z.string().trim().min(1, { message: "First name is required" }).max(20),
		lastName: z.string().max(20).trim(),
		username: z
			.string()
			.trim()
			.min(1, { message: "username is required" })
			.min(3, { message: "Username must be at least 3 characters" })
			.toLowerCase()
			.regex(/^[A-Za-z][A-Za-z0-9._]*$/, {
				message: "Username can only contain letters, numbers, underscores (_) , and periods (.)",
			}),
		email: z.string().email().min(1, { message: "Email is required" }),
		password: z
			.string()
			.min(1, { message: "Password is required" })
			.min(4, { message: "Password must be at least 4 characters" }),
		confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type SignupFormType = z.infer<typeof SignupFormSchema>;

// signIn form schema
export const SigninFormSchema = z.object({
	email: z.string().min(1, { message: "Please enter your username or email" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export type SigninFormType = z.infer<typeof SigninFormSchema>;
