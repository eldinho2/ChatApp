"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

type FormData = {
  userName: string;
  email: string;
  password: string;
};

const schema = z.object({
  userName: z
    .string()
    .min(4, { message: "usuario deve ter pelo menos 4 caracteres" })
    .max(20, { message: "Usuario nao pode ser maior que 20 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 8 caracteres" })
    .max(20, { message: "A senha não pode ter mais que 20 caracteres" }),
});

export default function Login() {
  const [formType, setFormType] = useState("register");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => console.log(data);

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
            onSubmit={handleSubmit(onSubmit)}
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
              className="p-2 rounded text-white bg-[#10a37f] hover:bg-[#079474] transition duration-200"
            >
              Login
            </button>
            <div className="flex  justify-center items-center">
              {formType === "login" ? (
                <div className="flex gap-2 text-base">
                  <h1>Ja tem uma conta?</h1>
                  <span
                    className="text-green-600 cursor-pointer"
                    onClick={toggleFormType}
                  >
                    Login
                  </span>
                </div>
              ) : (
                <div className="flex gap-2 text-base">
                  <h1>Ainda nao tem conta?</h1>
                  <span
                    className="text-green-600 cursor-pointer"
                    onClick={toggleFormType}
                  >
                    Registrar
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
