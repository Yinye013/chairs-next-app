"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, login as loginApi, signup as signupApi } from "../services/apiAuth";
import { toast } from "react-toastify";

type signupInputs = {
  email: string;
  password: string;
  name: string;
};

type loginInputs = {
  email: string;
  password: string;
};

export const useSignUp = () => {
  const signupUser = useMutation({
    mutationFn: async ({ email, password, name }: signupInputs) => {
      signupApi({ email, password, name });
    },
    onSuccess: () => {
      toast.success("Account created successfully, welcome!");
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
  return {
    signupUser,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const loginUser = useMutation({
    mutationFn: async ({ email, password }: loginInputs) => {
      loginApi({ email, password });
    },
    onSuccess: (user: any) => {
      toast.success(`Welcome, User`);
      queryClient.setQueryData(["user"], user.user);
      console.log(user);
      router.push("/");

      // if () {
      //   // window.location.href = "/";
      // }
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  return {
    loginUser,
  };
};

// You can write an useSignUp hook below in this file and export it, just like the useLogin hook above. The idea is to make all the calls in this file and export them to be used in the components. Hence, the name useCalls.ts
