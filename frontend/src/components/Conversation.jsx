import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

const Conversation = ({ conversation, isOnline }) => {
  const { colorMode } = useColorMode();
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.black"),
        color: "white",
      }}
      py={2}
      borderRadius={"md"}
      onClick={() =>
        setSelectedConversation({
          _id: conversation?._id,
          userId: user?._id,
          username: user?.username,
          userProfilePic: user?.profilePic,
          mock: conversation?.mock,
        })
      }
      bg={
        selectedConversation?._id === conversation?._id
          ? colorMode === "light"
            ? "gray.400"
            : "gray.dark"
          : ""
      }
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user?.profilePic}
        >
          {isOnline && <AvatarBadge boxSize={"1em"} bg="green.500" />}
        </Avatar>
      </WrapItem>

      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {user?.username.length > 18
            ? user?.username?.substring(0, 14) + "..."
            : user?.username}{" "}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser?._id === lastMessage.sender ? (
            <Box color={lastMessage.seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          ) : null}
          {lastMessage?.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text || <BsFillImageFill size={14} />}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
