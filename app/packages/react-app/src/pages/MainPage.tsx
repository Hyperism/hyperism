import React from "react";
import logo from "../ethereumLogo.png";
import { Header, Body, Image, Link } from "../components";
import { Container } from "@mui/material";
import MetamaskConnect from "../components/MetamaskConnect";

function MainPage(): JSX.Element {
  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Header>
        <MetamaskConnect />
      </Header>
      <Body>
        <Image src={logo} alt="ethereum-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        <Link href="https://reactjs.org">Learn React</Link>
        <Link href="https://usedapp.io/">Learn useDapp</Link>
        <Link href="https://thegraph.com/docs/quick-start">
          Learn The Graph
        </Link>
      </Body>
    </Container>
  );
}

export default MainPage;
