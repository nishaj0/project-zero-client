"use client";

import { SignupFormSchema, type SignupFormType } from "@/lib/form-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import Link from "next/link";
import { signup } from "@/actions/authentication";

const initialValues = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export function SignupForm() {
	const [checked, setChecked] = useState(false);
	const [error, setError] = useState<{ terms?: string; submit?: string }>({});
	const [loading, setLoading] = useState(false);

	const form = useForm<SignupFormType>({
		resolver: zodResolver(SignupFormSchema),
		defaultValues: initialValues,
	});

	const onSubmit = async (values: SignupFormType) => {
		setError({});
		setLoading(true);
		if (!checked) {
			setError({ terms: "You must accept the terms and conditions." });
			setLoading(false);
			return;
		}
		const { error } = await signup(values);

		if (error?.field) {
			form.control.setError(error.field, { message: error.message });
		} else if (error) {
			setError({ submit: error.message });
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen py-4 sm:my-0 flex justify-center items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-5xl w-full mx-4 rounded-md shadow-md border py-4 px-10"
				>
					<h2 className="text-2xl font-semibold my-4 ">Create an account</h2>
					<div className="grid sm:grid-cols-2 gap-x-20 gap-y-4 mb-4">
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

					<div className="grid sm:grid-cols-2">
						{error.submit && <p className="text-center text-red-500">{error.submit}</p>}
					</div>
					<div className="flex flex-col sm:flex-row items-center gap-y-2 my-4 ">
						<Button disabled={loading} className="w-full" type="submit">
							{loading ? "Loading..." : "Create account"}
						</Button>
						<div className="flex items-center">
							<div className="sm:hidden block h-[1px] bg-neutral-300 w-full" />
							<p className="col-span-2 sm:w-20 sm:mx-0 mx-4 text-neutral-300 text-center text-lg">OR</p>
							<div className="sm:hidden block h-[1px] bg-neutral-300 w-full" />
						</div>
						<Button variant="outline" className="w-full" type="button">
							Continue with Google
						</Button>
					</div>
					<p>
						Already have an account?{" "}
						<Link className="underline" href="/signin">
							Login.
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
}
