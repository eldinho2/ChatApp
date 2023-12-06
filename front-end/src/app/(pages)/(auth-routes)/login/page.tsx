"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginSchema, registerSchema } from './loginSchemas'
import LoadingSpinner from "@/app/utils/LoadingSpinner";

type FormData = {
  userName: string;
  email: string;
  password: string;
};



export default function Login() {
  const [formType, setFormType] = useState<string>("register");
  const [apiError, setApiError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formType === 'login' ? loginSchema : registerSchema) });

  const router = useRouter()

  const onSubmitForm = async(data: FormData, e:any) => {
    e.preventDefault();
    setIsLoading(!isLoading)
    const { userName, email, password } = data;

    const result = await signIn(formType, {
      ...(formType === 'register' && { userName }),
      email,
      password,
      redirect: false
    })
    
    
    if (result?.error) {
      console.log(result?.error)
      setApiError(result?.error)
      setIsLoading(false)
      return
    }

    router.replace('/chat')
  };


  const toggleFormType = () =>
    setFormType((prevType) => (prevType === "login" ? "register" : "login"));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-20">
        <Image
          src="/PFAC Logo.jpg"
          alt="Logo Play For A Cause"
          width={100}
          height={100}
        />
        {formType === "login" ? (
          <h1 className="text-2xl font-bold">Bem-vindo De Volta</h1>
        ) : (
          <h1 className="text-2xl font-bold">Criar Conta</h1>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="h-[400px] w-[400px]">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col space-y-4 p-8 animate-fade-in-down"
          >
            {formType === "register" && (
              <>
                <input
                  {...register("userName")}
                  placeholder="Nome de Usuario"
                  className="p-2 rounded border border-gray-200 focus:border-[#10a37f] animate-fade-in-up focus:outline-none"
                />
                {errors.userName && (
                  <p className="text-red-500 animate-fade-in-down">
                    {errors.userName.message}
                  </p>
                )}
              </>
            )}
            <input
              {...register("email")}
              placeholder="Email"
              className="p-2 rounded border border-gray-200 focus:border-[#10a37f] focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 animate-fade-in-down">
                {errors.email.message}
              </p>
            )}

            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-2 rounded border border-gray-200 focus:border-[#10a37f] focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 animate-fade-in-down">
                {errors.password.message}
              </p>
            )}

            <button
              type="submit"
              className={`flex justify-center items-center p-2 rounded text-white bg-[#10a37f] ${!isLoading && 'hover:bg-[#079474]'} transition duration-200`}
              onSubmit={handleSubmit(onSubmitForm)}
              disabled={isLoading}
            >
              {
                isLoading ? <LoadingSpinner /> : formType === "login" ? 'Login' : 'Registrar'
              }
            </button>
            <span className="text-green-600 ">{apiError}</span>

            <div className="flex  justify-center items-center">
              {formType === "login" ? (
                <div className="flex gap-2 text-base">
                  <h1>Ainda nao tem conta?</h1>
                  <span
                    className="text-green-600 cursor-pointer"
                    onClick={toggleFormType}
                  >
                    Registrar
                  </span>
                </div>
              ) : (
                <div className="flex gap-2 text-base">
                  <h1>Ja tem uma conta?</h1>
                  <span
                    className="text-green-600 cursor-pointer"
                    onClick={toggleFormType}
                  >
                    Login
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
