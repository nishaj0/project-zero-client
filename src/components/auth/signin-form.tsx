"use client";

import { SigninFormSchema, type SigninFormType } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";

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

	const onSubmit = (values: SigninFormType) => {
		setError(null);
		setLoading(true);
		console.log(values);
		setTimeout(() => {
			setLoading(false);
			setError("Invalid credentials");
		}, 1000);
	};

	return (
		<div className="min-h-screen py-4  flex justify-center items-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full mx-4 rounded-md shadow-md border p-4">
					<h2 className="text-2xl font-semibold my-4 ">Login</h2>
					<div className="space-y-4 mb-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username or Email</FormLabel>
									<FormControl>
										<Input placeholder="johndoe@gmail.com" {...field} />
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
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						{error && <p className="text-red-500 text-center">{error}</p>}
						<Button disabled={loading} className="my-4" type="submit">
							{loading ? "Loading..." : "Login"}
						</Button>
						<div className="flex items-center">
							<div className="h-[1px] bg-neutral-300 w-full" />
							<p className="text-neutral-500 px-2 flex-shrink-0">Or sign In with</p>
							<div className="h-[1px] bg-neutral-300 w-full" />
						</div>
						<div className="grid sm:grid-cols-2 gap-2">
							<Button variant="outline" type="button">
								Google
							</Button>
							<Button variant="outline" type="button">
								Facebook
							</Button>
						</div>
						<p>
							Don't have an account?{" "}
							<Link className="underline" href="/signup">
								Create an account.
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
