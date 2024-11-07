"use client";

import { SignupFormSchema, type SignupFormType } from "@/lib/form-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { set } from "zod";
import Link from "next/link";

const initialValues = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	terms: false,
};

export function SignupForm() {
	const [checked, setChecked] = useState(false);
	const [error, setError] = useState<{ terms?: string; submit?: string }>({});
	const [loading, setLoading] = useState(false);

	const form = useForm<SignupFormType>({
		resolver: zodResolver(SignupFormSchema),
		defaultValues: initialValues,
	});

	function onSubmit(values: SignupFormType) {
		setError({});
		setLoading(true);
		if (!checked) {
			setError({ terms: "You must accept the terms and conditions." });
			setLoading(false);
			return;
		}
		// Signup api call
		console.log(values);
		setLoading(false);
	}

	return (
		<div className="sm:h-screen flex justify-center items-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl w-full mx-4 rounded-md shadow-md border p-4">
					<h2 className="text-2xl font-semibold my-4 ">Create an account</h2>
					<div className="grid sm:grid-cols-2 gap-x-4 gap-y-8 mb-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input placeholder="John" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="john_doe" {...field} />
									</FormControl>
									{/* <FormDescription>Your unique username.</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="johndoe@gmail.com" {...field} />
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
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="items-top flex gap-2">
							<Checkbox
								onCheckedChange={(val: boolean) => {
									setChecked(val);
								}}
								id="terms"
							/>
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor="terms"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Accept terms and conditions
								</label>
								<p className="text-sm text-muted-foreground">
									You agree to our{" "}
									<a href="/" className="underline text-gray-600 hover:text-gray-800">
										Terms of Service and Privacy Policy.
									</a>
								</p>
								{error.terms && <p className="text-sm text-red-500">{error.terms}</p>}
							</div>
						</div>
					</div>

					<div className="grid sm:grid-cols-2 items-center gap-x-4">
						<Button className="my-4" type="submit">
							Create Account
						</Button>
						<p>
							Already have an account?{" "}
							<Link className="underline" href="/signin">
								Login.
							</Link>{" "}
						</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
