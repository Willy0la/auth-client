"use client";

import { authApi } from "@/app/lib/api";
import {
  loginDefaultValue,
  loginSchema,
  type LoginFormData,
} from "@/app/lib/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    unregister,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: loginDefaultValue,
  });

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [usePin, setUsePin] = useState(false);

  const switchToPin = () => {
    unregister("password");
    setUsePin(true);
  };

  const switchToPassword = () => {
    unregister("pinCode");
    setUsePin(false);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
     const payload: { identifier: string; password?: string; pinCode?: string } = {
  identifier: data.identifier,
};

      if (usePin) {
        payload.pinCode = data.pinCode;
      } else {
        payload.password = data.password;
      }

      const response = await authApi.signIn(payload);
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
      <h2>SignIn Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="min-h-screen bg-blue-50 items-center flex flex-col max-w-md mx-auto mt-5 gap-6 py-16 px-16"
      >
        <div className="flex flex-col w-100">
          <label
            className="text-sm text-gray-500 mb-2 font-normal"
            htmlFor="identifier"
          >
            Identifier
          </label>
          <input
            {...register("identifier")}
            className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            type="text"
            placeholder="email or username"
            id="identifier"
            autoComplete="username"
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
        {success && <p className="text-green-500 text-sm">Login successful!</p>}

        {usePin ? (
          <div className="flex flex-col w-100 gap-1">
            <label className="text-sm text-gray-500 mb-2">PIN Code</label>
            <input
              {...register("pinCode")}
              type="password"
              placeholder="Enter PIN"
              className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
            />
            {errors.pinCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pinCode.message}
              </p>
            )}
            <button
              type="button"
              onClick={switchToPassword}
              className="text-blue-600 text-sm underline self-end cursor-pointer"
            >
              Use password instead
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-100 gap-1">
            <label className="text-sm text-gray-500 mb-2">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter Password"
              className="text-l text-gray-900 font-normal px-2 py-2 border-solid border-1 border-blue-300 rounded-lg"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            <button
              type="button"
              onClick={switchToPin}
              className="text-blue-600 text-sm underline self-end cursor-pointer"
            >
              Use PIN instead
            </button>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-900 py-4 px-44 text-blue-100 rounded-lg"
        >
          Login
        </button>
      </form>
    </>
  );
}