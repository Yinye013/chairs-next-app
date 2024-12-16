import { useMutation } from '@tanstack/react-query';
// import supabase from "../services/supabase";
import { toast } from 'react-toastify';
import axios from 'axios';
import supabase from '../services/supabase';

// SIGN UP HOOK
// export const useSignUp = () => {
// return useMutation(async (credentials: { email: string; password: string; name: string }) => {
//   let { data, error } = await supabase.auth.signUp({
//     email: credentials.email,
//     password: credentials.password,
//   });
//   if (error) {
//     toast.error(error.message);
//   }
//   const userId = data?.user?.id;
//   if (userId) {
//     // handle name in profile
//     const { error } = await supabase.from("profiles").insert({ id: userId, name: credentials.name });
//     if (error) {
//       console.log(error.message);
//     }
//   }
//   return data;
// });
export const useSignUp = () => {
  // add a isloading feature and return it with signup

  const signUp = useMutation(
    async (credentials: { email: string; password: string; name: string }) => {
      try {
        // const { data } = await axios.get(
        //   'http://localhost:5000/api/users/getusers',
        // );
        // console.log(data);

        // documentation: ran into an issue with the signup endpoint, I didn't install cors and require it in the backend for cross origin requests.

        const { data } = await axios.post(
          'http://localhost:5000/api/users/register',
          credentials,
        );

        console.log(credentials);

        if (data) {
          //setting the user in local storage
          localStorage.setItem('currentUser', JSON.stringify(data));
          toast.success('Registration Successful');
        }
        return data;
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.message || 'Registration failed.';
        toast.error(errorMessage);
      }
    },
  );
  return { signUp };
};

// SIGN OUT HOOK
export const useSignOut = () => {
  // return useMutation(async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     toast.error('Error signing out');
  //   } else {
  //     toast.success('Signed Out Successfully');
  //   }
  // });
  return useMutation(async () => {
    try {
      localStorage.removeItem('currentUser');
      toast.success('Signed Out Successfully');
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  });
};

//SIGN IN (LOGIN) HOOK
export const useSignIn = () => {
  const signIn = useMutation(
    async (credentials: { email: string; password: string }) => {
      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        credentials,
      );
      if (data) {
        //setting the user in local storage
        localStorage.setItem('currentUser', JSON.stringify(data));
        toast.success('Login Successful');
      }
      return data;
    },
    {
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || 'Login failed. Invalid credentials';
        console.error('Error:', errorMessage);
        toast.error(errorMessage);
      },
      onSuccess: (data) => {
        toast.success(`Welcome back, ${data.name}!`);
      },
    },
  );
  return { signIn };
};

// SIGNIN WITH GOOGLE

export const useSignUpWithGoogle = () => {
  const signUpWithGoogle = useMutation(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000',
        },
      });
      if (error) {
        throw error;
      }
      toast.success('Welcome!');

      const { data: user } = await supabase.auth.getUser();
      console.log(user);
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || 'Login failed. Invalid credentials';
      console.error('Error:', errorMessage);
      toast.error(errorMessage);
    }
  });
  return { signUpWithGoogle };
};

export const useSignInWithGoogle = () => {
  const signInWithGoogle = useMutation(async () => {
    try {
      // Trigger Google OAuth sign-in
      const { error: authError, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (authError) {
        throw authError;
      }

      if (!data) {
        throw new Error('No user found after Google OAuth sign-in.');
      }

      const { data: session, error: userError } =
        await supabase.auth.getSession();

      localStorage.setItem('userSession', JSON.stringify(session));
      if (userError || !session) {
        throw new Error('Failed to retrieve user session after OAuth.');
      }
      console.log(session);
      const user = session?.session?.user;

      // Access user metadata and extract first name
      const fullName = user?.raw_user_meta_data?.full_name || 'User';
      const firstName = fullName.split(' ')[0]; // Get first name

      // Save user details in localStorage
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ ...user, firstName }),
      );

      // Optionally, fetch or update the user profile in the database (e.g., checking if the profile exists)
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: user?.id, name: firstName });

      if (profileError) {
        console.error('Error updating profile:', profileError.message);
      }

      toast.success(`Welcome back, ${firstName}!`);
      return { ...user, firstName };
    } catch (error: any) {
      console.error(error);

      // Better error message handling
      const errorMessage = error?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  });

  return { signInWithGoogle };
};
