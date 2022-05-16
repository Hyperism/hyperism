import ResponsiveAppBar from "./components/AppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditorPage from "./pages/EditorPage"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <div style={{background: 'inherit' }}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={MainPage()} />
          <Route path="/editor" element={EditorPage()} />
          <Route path="/main" element={MainPage()} />
          <Route path="/signup" element={SignUpPage()} />
          <Route path="/login" element={LoginPage()} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
