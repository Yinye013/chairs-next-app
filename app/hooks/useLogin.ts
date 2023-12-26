"use client";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type loginInputs = {
  email: string;
  password: string;
};

export function useLogin() {
  const router = useRouter();

  const { mutate: login, isLoading } = useMutation({
    // using onMutate to trigger types instead of mutateFn
    /////HOW FAR. THE ERROR IS COMING FROM HERE, ASKING ME FOR QUERY CLIENT
    onMutate: ({ email, password }: loginInputs) => {
      loginApi({ email, password });
    },
    onSuccess: (user) => {
      console.log(user);
      router.push("/");
    },
    onError: () => {
      toast.error("error");
    },
  });

  return { login, isLoading };
}

export default useLogin;
