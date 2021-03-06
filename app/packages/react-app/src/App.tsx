import ResponsiveAppBar from "./components/AppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import MainPage from "./pages/MainPage";
import EditorPage from "./pages/EditorPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ExplorePage from "./pages/ExplorePage";
import MyPage from "./pages/MyPage";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div style={{ background: "inherit" }}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={MainPage()} />
          <Route
            path="/editor"
            element={
              localStorage.getItem("user") ? (
                <EditorPage />
              ) : (
                <Navigate
                  to={{
                    pathname: "/login",
                  }}
                />
              )
            }
          />
          <Route path="/main" element={<Navigate to="/" />} />
          <Route
            path="/signup"
            element={
              localStorage.getItem("user") ? (
                <Navigate
                  to={{
                    pathname: "/main",
                  }}
                />
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route
            path="/explore"
            element={
              localStorage.getItem("user") ? (
                <ExplorePage />
              ) : (
                <Navigate
                  to={{
                    pathname: "/login",
                  }}
                />
              )
            }
          />
          <Route
            path="/mypage"
            element={
              localStorage.getItem("user") ? (
                <MyPage />
              ) : (
                <Navigate
                  to={{
                    pathname: "/mypage",
                  }}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              localStorage.getItem("user") ? (
                <Navigate
                  to={{
                    pathname: "/main",
                  }}
                />
              ) : (
                <LoginPage />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
