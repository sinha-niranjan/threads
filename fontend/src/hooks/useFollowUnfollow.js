import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";

const useFollowUnfollow = (user) => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [updating, setUpdating] = useState(false);
  const [following, setFllowings] = useState(
    user.followers.includes(currentUser?._id)
  );

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollow ${user?.name}`, "success");
        user.followers.pop(); // simulate removing from followers only for client side
      } else {
        showToast("Success", `Follow ${user.name}`, "success"); // simulate adding from followers only for client side
        user?.followers?.push(currentUser?._id);
      }
      setFllowings(!following);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
