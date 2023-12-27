"use client";

import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { toast } from "react-toastify";

type loginInputs = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const loginUser = useMutation({
    mutationFn: async ({ email, password }: loginInputs) => {
      loginApi({ email, password });
    },
    onSuccess: (user: any) => {
      if (user) {
        toast.success("Welcome");
        window.location.href = "/";
      }
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