import React from "react";
import Button from "@mui/material/Button";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditorPage(): JSX.Element {
  const [_anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Editor />
      <Button
        key={"Mint"}
        onClick={handleCloseNavMenu}
        sx={{ my: 2, bgcolor: "#161B22", color: "white", display: "block" }}
      >
        {"Mint"}
      </Button>
      <Button
        key={"Close"}
        onClick={() => useNavigate()("/")}
        sx={{ my: 2, bgcolor: "#161B22", color: "white", display: "block" }}
      >
        {"Close"}
      </Button>
    </Container>
  );
}

export default EditorPage;
