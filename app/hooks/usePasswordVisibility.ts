import { useState, useCallback } from "react";

export function usePasswordToggle() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((current) => !current);
  }, []);

  return {
    isPasswordVisible,
    togglePasswordVisibility,
    inputType: isPasswordVisible ? "text" : "password",
  };
}
