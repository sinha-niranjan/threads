import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import PostPages from "./pages/PostPages";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPages from "./pages/UserPages";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  return (
    <Box position={"relative"} w={"full"}>
      <Container
        maxWidth={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to={"/"} /> : <AuthPage />}
          />{" "}
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPages />
                  <CreatePost />
                </>
              ) : (
                <UserPages />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPages />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
