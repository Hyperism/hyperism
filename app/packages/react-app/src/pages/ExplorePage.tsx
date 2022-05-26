import React from "react";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { UserLoginInfo, MetadataInfo, ShaderQueryInfo } from "./Interfaces";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {
  getWallet,
  getMstbyId,
  getTstbyMst,
  onPurchase,
} from "@my-app/contracts";

function ExplorePage(): JSX.Element {
  const [_anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const _handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [shaderNFTs, setShaderNFTs] = React.useState<MetadataInfo[]>([]);
  const [shaderCodes, setShaderCodes] = React.useState<
    Map<string, ShaderQueryInfo>
  >(() => new Map());

  const tradeHandler = (metaId: string, price: number) => () => {
    /* eslint-disable   @typescript-eslint/no-non-null-assertion */
    const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

    getWallet().then((wallet) => {
      const mstaddr = getMstbyId(metaId);
      const tstaddr = getTstbyMst(mstaddr);
      onPurchase(wallet, tstaddr, mstaddr, 1, price)
        .then(() => {
          // Modify owner of this meta info with new owner
          const form = new FormData();
          form.append("owner", userObj.user.username);
          axios
            .put(`http://localhost:3000/api/meta/update/${metaId}`, form, {
              headers: {
                "Content-Type": `application/json`,
                Authorization: `${userObj.token}`,
              },
            })
            .then((res) => {
              console.log(
                "GET api/meta Request success : " + JSON.stringify(res.data)
              );
              if (res.data.data != null) {
                setShaderNFTs(res.data.data);
              }
            })
            .catch((ex) => {
              console.log("GET api/meta Request fail : " + ex);
            })
            .finally(() => {
              console.log("GET api/meta Request End");
            });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          "NFT Trading Success";
        });
    });
    // change owner of the shader
  };

  React.useEffect(() => {
    /* eslint-disable   @typescript-eslint/no-non-null-assertion */
    const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);
    console.log(userObj);

    try {
      axios
        .get("http://localhost:3000/api/meta", {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `${userObj.token}`,
          },
        })
        .then((res) => {
          console.log(
            "GET api/meta Request success : " + JSON.stringify(res.data)
          );
          if (res.data.data != null) {
            setShaderNFTs(res.data.data);
          }
        })
        .catch((ex) => {
          console.log("GET api/meta Request fail : " + ex);
        })
        .finally(() => {
          console.log("GET api/meta Request End");
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    /* eslint-disable   @typescript-eslint/no-non-null-assertion */
    const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);
    console.log(userObj);

    shaderNFTs.forEach((metaInfo) => {
      try {
        console.log("queryShaderCode token : {}", userObj.token);
        axios
          .get(`http://localhost:3000/api/meta/getshader/${metaInfo._id}`, {
            headers: {
              "Content-Type": `application/json`,
              Authorization: `${userObj.token}`,
            },
          })
          .then((res) => {
            console.log(
              "GET api/meta/getshader Request success : " +
                JSON.stringify(res.data)
            );
            console.log("Shader Code : {}", shaderCodes);
            setShaderCodes(shaderCodes.set(metaInfo._id, res.data));
          })
          .catch((ex) => {
            console.log(
              `http://localhost:3000/api/meta/getshader/${metaInfo._id}` + ex
            );
          })
          .finally(() => {
            console.log("GET api/meta Request End");
          });
      } catch (e) {
        console.log(e);
      }
    });
  }, [shaderNFTs]);

  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item key={0} xs={12}>
            {shaderNFTs.map((shaderInfo) => {
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Editor
                  defaultShader={shaderCodes.get(shaderInfo._id)!.shader}
                />
              </Card>;
              <FormControl fullWidth sx={{ m: 4 }}>
                Owner : ${shaderInfo.owner}
                Minter: ${shaderInfo.minter}
                Price : ${shaderInfo.price} ether
                <Button
                  key={"Buy"}
                  onClick={tradeHandler(shaderInfo._id, shaderInfo.price)}
                  sx={{
                    my: 2,
                    bgcolor: "#161B22",
                    color: "white",
                    display: "block",
                  }}
                >
                  {"Buy"}
                </Button>
              </FormControl>;
              <FormControl fullWidth sx={{ m: 4 }}>
                Title : ${shaderInfo.title}
                Description: ${shaderInfo.description}
              </FormControl>;
            })}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default ExplorePage;
