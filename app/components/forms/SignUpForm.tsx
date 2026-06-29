 "use client";

import {
  defaultSignupValues,
  SignUpFormData,
  signupSchema,
} from "@/app/lib/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/lib/api";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    defaultValues: defaultSignupValues,
    mode: "onTouched",
    resolver: zodResolver(signupSchema),
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const submit = async (data: SignUpFormData) => {
    try {
      const response = await authApi.signUp(data);
      if (response.success) {
        localStorage.setItem("token", response.data.token);
        setSuccess(true);
        reset();
        router.push("/dashboard");
      } else {
        setApiError(response.message || "Something went wrong");
      }
    } catch (err) {
      setApiError("Network error. Please try again.");
    }
  };

  return (
    <>
      <h1 className="mt-20 text-center text-2xl font-bold">SignupForm</h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="min-h-screen bg-blue-50 items-center flex flex-col max-w-md mx-auto mt-5 gap-6 py-16 px-16"
      >
        <div className="flex flex-col w-100">
          <label className="text-sm text-gray-500 mb-2 font-normal" htmlFor="name">
            name
          </label>
          <input
            {...register("name")}
            className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            type="text"
            placeholder="fullName"
            id="name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col w-100">
          <label className="text-sm text-gray-500 mb-2 font-normal" htmlFor="userName">
            userName
          </label>
          <input
            {...register("userName")}
            className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            type="text"
            placeholder="userName"
            id="userName"
          />
          {errors.userName && (
            <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>
          )}
        </div>

        <div className="flex flex-col w-100">
          <label className="text-sm text-gray-500 mb-2 font-normal" htmlFor="email">
            email
          </label>
          <input
            {...register("email")}
            type="email"
            className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            placeholder="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col w-100">
          <label className="text-sm text-gray-500 mb-2 font-normal" htmlFor="password">
            password
          </label>
          <input
            {...register("password")}
            className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            type="password"
            placeholder="password"
            id="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col w-100">
          <label className="text-sm text-gray-500 mb-2 font-normal" htmlFor="pinCode">
            pinCode
          </label>
          <input
            {...register("pinCode")}
            className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            type="password"
            placeholder="pinCode"
            id="pinCode"
          />
          {errors.pinCode && (
            <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>
          )}
        </div>

        <div className="flex flex-col w-100">
          <label className="text-sm text-gray-500 mb-2 font-normal" htmlFor="phoneNumber">
            phoneNumber
          </label>
          <input
            {...register("phoneNumber")}
            className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            type="tel"
            placeholder="phoneNumber"
            id="phoneNumber"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
        {success && (
          <p className="text-green-500 text-sm">Account created successfully!</p>
        )}

        <button
          type="submit"
          className="bg-blue-900 py-4 px-44 text-blue-100 rounded-lg"
        >
          Signup
        </button>
      </form>
    </>
  );
}