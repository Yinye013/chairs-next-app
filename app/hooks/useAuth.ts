import { useMutation } from "@tanstack/react-query";
import supabase from "../services/supabase";
import { toast } from "react-toastify";

// SIGN UP HOOK
export const useSignUp = () => {
  return useMutation(async (credentials: { email: string; password: string; name: string }) => {
    let { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      toast.error(error.message);
    }
    const userId = data?.user?.id;
    if (userId) {
      // handle name in profile
      const { error } = await supabase.from("profiles").insert({ id: userId, name: credentials.name });
      if (error) {
        console.log(error.message);
      }
    }
    return data;
  });
};

//SIGN IN (LOGIN) HOOK
export const useSignIn = () => {
  return useMutation(async (credentials: { email: string; password: string }) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      toast.error(error.message);
    }

    const userId = data?.user?.id;
    if (userId) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.log(profileError.message);
        throw new Error(profileError.message); // Handle error
      }
      return { data, profileData };
    }
  });
};
