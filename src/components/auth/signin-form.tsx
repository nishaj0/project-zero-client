"use client";

import { SigninFormSchema, type SigninFormType } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { login } from "@/actions/authentication";

const initialValues = {
	email: "",
	password: "",
};

export default function SigninForm() {
	const form = useForm<SigninFormType>({
		resolver: zodResolver(SigninFormSchema),
		defaultValues: initialValues,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (values: SigninFormType) => {
		setError(null);
		setLoading(true);

		const { error } = await login(values);
		if (error?.field) {
			form.control.setError(error.field, { message: error.message }); // set error messages on their respective fields
		} else if (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen py-4  flex justify-center items-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full mx-4 rounded-md shadow-md border p-4">
					<h2 className="text-2xl font-semibold my-4 ">Login</h2>
					<div className="space-y-4 mb-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username or Email</FormLabel>
									<FormControl>
										<Input autoComplete="username" placeholder="johndoe@gmail.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input autoComplete="current-password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex flex-col gap-4">
						{error && <p className="text-red-500 text-center">{error}</p>}
						<Button disabled={loading} className="mt-4" type="submit">
							{loading ? "Loading..." : "Login"}
						</Button>
						<div className="flex items-center">
							<div className="h-[1px] bg-neutral-300 w-full" />
							<p className="text-neutral-500 px-4 flex-shrink-0">OR</p>
							<div className="h-[1px] bg-neutral-300 w-full" />
						</div>
						<Button variant="outline" type="button">
							Continue with Google
						</Button>
						<p>
							Don't have an account?{" "}
							<Link className="underline" href="/signup">
								Create now!!
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
