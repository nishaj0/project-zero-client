"use server";

import axiosInstance from "@/lib/axios";
import { axiosErrorCatch } from "@/lib/axiosErrorCatch";
import type { SignupFormType } from "@/lib/form-schemas";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export const login = async (values: { email: string; password: string }) => {
  let success = false;
  try {
    const { data } = await axiosInstance.post("/api/login", values);
    await createSession(data.user);
    success = true;
  } catch (err) {
    return axiosErrorCatch(err);
  }
  if (success) redirect("/"); // don't use redirect inside try block!
};

export const logout = async () => {
  await deleteSession();
  redirect("/signin");
};

export const signup = async (values: SignupFormType) => {
  let success = false;
  try {
    const { data } = await axiosInstance.post("/api/register", values);
    await createSession(data.user);
    success = true;
  } catch (error) {
    return axiosErrorCatch(error);
  }
  if (success) redirect("/");
};
