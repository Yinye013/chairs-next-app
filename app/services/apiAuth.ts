import supabase from "./supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type loginInputs = {
  email: string;
  password: string;
};

export async function login({ email, password }: loginInputs) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(error.message);
  }
  if (!error) {
    toast.success("Welcome");
  }

  console.log(data);
  return data;
}
