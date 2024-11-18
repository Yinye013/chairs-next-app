import { useState, useEffect } from "react";
import supabase from "../services/supabase";

interface User {
  id: string;
  email: string;
  name: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(() => {
    // INITIALIZING LOCAL STORAGE
    if (typeof window !== "undefined") {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        return JSON.parse(currentUser);
      }
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // create fetchUser function
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error || !data) {
        setUser(null);
        // console.log("error finding someone");
        localStorage.removeItem("currentUser");
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
      const currentUser = {
        id: userId,
        email: data.user.email || "User",
        name: userName,
      };
      setUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setLoading(false);
    };
    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user]);
  return { user, loading };
};
