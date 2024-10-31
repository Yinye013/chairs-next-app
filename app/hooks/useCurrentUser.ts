import { useState, useEffect } from "react";
import supabase from "../services/supabase";

interface User {
  id: string;
  email: string;
  name: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // create fetchUser function
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error || !data) {
        setUser(null);
        // console.log("error finding someone");
        setLoading(false);
        return;
      }
      const userId = data?.user?.id;
      let userName = "User";

      // If user ID exists, fetch profile data from 'profiles' table
      if (userId) {
        const { data: profileData, error } = await supabase.from("profiles").select("name").eq("id", userId).single();

        if (error) {
          console.log("profile search error", error.message);
        } else if (profileData) {
          userName = profileData.name || userName;
        }
      }
      setUser({
        id: userId,
        email: data.user.email || "User",
        name: userName,
      });
      setLoading(false);
    };
    fetchUser();
  }, []);
  return { user, loading };
};
