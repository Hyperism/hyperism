import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import logo from "../ethereumLogo.png";
import Button from "@mui/material/Button";
import { Header, Body, Image, Link } from "../components";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

function ExplorerPage(): JSX.Element {
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

export default ExplorerPage;
