import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import logo from "../ethereumLogo.png";
import Button from "@mui/material/Button";
import { Header, Body, Image, Link } from "../components";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popper from "@mui/material/Popper";
import anchorEl from "@mui/material/Popper/Popper.js";
import Fade from "@mui/material/Fade";

function WalletButton() {
  const [rendered, setRendered] = useState("");

  const ens = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <Button
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}

function EditorPage(): JSX.Element {
  if (localStorage.getItem("user") == null) {
    return (
      <Popper open={true} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              The content of the Popper.
            </Box>
          </Fade>
        )}
      </Popper>
    );
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
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
