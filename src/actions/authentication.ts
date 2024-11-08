"use server";

import type { SignupFormType } from "@/lib/form-schemas";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

const testUsers = [
	{
		firstName: "John",
		lastName: "Doe",
		username: "johndoe",
		email: "johndoe@gmail.com",
		password: "john",
	},
	{
		firstName: "Jane",
		lastName: "Doe",
		username: "janedoe",
		email: "janedoegmail.com",
		password: "jane",
	},
];

export const login = async (values: { email: string; password: string }): Promise<{
	error: {
		message: string;
		field?: "email" | "password";
	};
}> => {
	let user: (typeof testUsers)[0] | undefined;
	if (values.email.includes("@")) {
		// login with email
		user = testUsers.find((user) => user.email === values.email);
	} else {
		// login with username
		user = testUsers.find((user) => user.username === values.email);
	}

	if (!user) {
		return {
			error: {
				message: "User not found",
				field: "email",
			},
		};
	}

	if (user.password !== values.password) {
		return {
			error: {
				message: "Invalid credentials",
				field: "password",
			},
		};
	}

	const { password: _, ...sessionData } = user;

	await createSession(sessionData);

	redirect("/");
};

export const logout = async () => {
	await deleteSession();
	redirect("/signin");
};

export const signup = async (
	values: SignupFormType,
): Promise<{
	error: {
		message: string;
		field?: "email" | "username";
	};
}> => {
	if (testUsers.find((user) => user.username === values.username)) {
		return {
			error: {
				message: "Username already exists",
				field: "username",
			},
		};
	}

	if (testUsers.find((user) => user.email === values.email)) {
		return {
			error: {
				message: "Email already exists",
				field: "email",
			},
		};
	}

	const { password, confirmPassword, ...sessionData } = values;
	await createSession(sessionData);

	redirect("/");
};
