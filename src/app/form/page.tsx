"use client";
import React from "react";
import { z, ZodType } from "zod";
import * as ReactHookForm from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const page = () => {
  const { useForm } = ReactHookForm;
  interface formData {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
  }
  const formSchema: ZodType<formData> = z
    .object({
      firstName: z
        .string()
        .min(2, { message: "firstName must be at least 2 characters" })
        .max(20),
      lastName: z.string().min(2).max(20),
      email: z.string().email(),
      mobile: z
        .string()
        .min(10, { message: "phone number should be at least 10 digits" })
        .max(10, { message: "phone number can't be  greater than 10 digits" }),
      password: z.string().min(6).max(20),
      confirmPassword: z.string().min(6).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does't match",
      path: ["confirmPassword"],
    });
  const handleSubmitManual = (data: formData) => {
    console.log(data);
  };

  // const { register, handleSubmit } = useForm({
  //   resolver: zodResolver(formSchema),
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div>
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
        <div className="text-center mb-16">
          <a href="">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-52 inline-block"
            />
          </a>
          <h4 className="text-gray-800 text-base font-semibold mt-6">
            Sign up into your account
          </h4>
        </div>

        <form onSubmit={handleSubmit(handleSubmitManual)}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter name"
              />
              {errors.firstName && (
                <span className="text-red-600">{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <span className="text-red-600">{errors.lastName.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Email Id
              </label>
              <input
                {...register("email")}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Mobile No.
              </label>
              <input
                {...register("mobile")}
                type="number"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter mobile number"
              />
              {errors.mobile && (
                <span className="text-red-600">{errors.mobile.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter confirm password"
              />
              {errors.confirmPassword && (
                <span className="text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
