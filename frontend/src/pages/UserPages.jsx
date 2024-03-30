import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import UserHeader from "../components/UserHeader";
import useShowToast from "../hooks/useShowToast";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPages = () => {
  const showToast = useShowToast();
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      if (user === null) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/post/user/${username}`, {
          method: "GET",
        });

        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast, setPosts, user]);

  if (!user && loading)
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );

  if (!user && !loading) return <h1>USER NOT FOUND !!! </h1>;
  return (
    <div>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has not posts yet.</h1>}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post?._id} post={post} postedBy={post?.postedBy} />
      ))}
    </div>
  );
};

export default UserPages;
