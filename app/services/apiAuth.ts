import supabase from "./supabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type signupInputs = {
  email: string;
  password: string;
  name: string;
};
type loginInputs = {
  email: string;
  password: string;
};

// FOR SIGNING UP -- CREATING A NEW USER:
export async function signup({ email, password, name }: signupInputs) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    toast.error(error.message);
  }
  if (!error) {
    toast.success("Signed Up Successfully!");
    window.location.href = "/";
    //this window navigation is under consideration
  }
  console.log(data);
  return data;
}

// FOR LOGGING IN
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
    if (data) {
      window.location.href = "/";
      //this window navigation is under consideration
    }
  }
  console.log(data);
  return data;
}
