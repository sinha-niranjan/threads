import React from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";

const useLogout = () => {
  const [user,setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();
  const logout = async () => {
    try {
      //fetch
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();

      if (data.error) {
        showToast("Error", data.error, "erorr");
        return;
      }

      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
