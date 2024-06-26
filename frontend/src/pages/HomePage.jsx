import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import Post from "../components/Post";
import SuggestedUsers from "../components/SuggestedUsers";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/post/feed");

        const data = await res.json();

        if (data?.length > 0) setPosts(data);
        if (data.error) {
          showToast("Error", data.error, "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast, setPosts]);
  return (
    <Flex gap={10} alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts?.length === 0 && (
          <h1>
            {" "}
            Follow some users to see the feed. or your followed users has not
            posted yet anything.
          </h1>
        )}
        {loading && (
          <Flex justify={"center"}>
            <Spinner size={"xl"} />
          </Flex>
        )}
        {posts &&
          posts?.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
      </Box>
      <Box flex={30} display={{ base: "none", md: "block" }}>
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default HomePage;
