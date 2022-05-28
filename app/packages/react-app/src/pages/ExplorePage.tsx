import React from "react";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { UserLoginInfo, MetadataInfo, ShaderQueryInfo } from "./Interfaces";
import axios, { AxiosResponse } from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { getWallet, onPurchase } from "@my-app/contracts";
import {
  GetAllMetadatas,
  GetShaderCode,
  TransferNFTOwnership,
  GetMintShaderTokenAddress,
  GetTradeShaderTokenAddress,
} from "./RestUtils";

function tradeNFTHandler(metaId: string, price: number) {
  return () => {
    getWallet().then((wallet) => {
      GetMintShaderTokenAddress(metaId, (mstAddress: string) => {
        GetTradeShaderTokenAddress(mstAddress, (tstAddress: string) => {
          onPurchase(wallet, tstAddress, mstAddress, 1, price)
            .then(() => {
              TransferNFTOwnership(metaId);
            })
            .catch((e) => {
              console.log(e);
            })
            .finally(() => {
              "NFT Trading Success";
            });
        });
      });
    });
  };
}

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

  React.useEffect(() => {
    try {
      GetAllMetadatas((metaDataInfos: MetadataInfo[]) => {
        setShaderNFTs(metaDataInfos);
        console.log("ShaderNFTs : {}", shaderNFTs);
        shaderNFTs.forEach((metaInfo) => {
          try {
            GetShaderCode(metaInfo._id, (shaderQuery: ShaderQueryInfo) => {
              setShaderCodes((codes) => {
                codes.set(metaInfo._id, shaderQuery);
                console.log("ShaderCodes : {}", shaderCodes);
                return codes;
              });
            });
          } catch (e) {
            console.log(e);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // React.useEffect(() => {
  //   /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  //   const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);
  //   console.log(userObj);

  //   shaderNFTs.forEach((metaInfo) => {
  //     try {
  //       console.log("queryShaderCode token : {}", userObj.token);
  //       axios
  //         .get(`http://localhost:3000/api/meta/getshader/${metaInfo._id}`, {
  //           headers: {
  //             "Content-Type": `application/json`,
  //             Authorization: `${userObj.token}`,
  //           },
  //         })
  //         .then((res) => {
  //           console.log(
  //             "GET api/meta/getshader Request success : " +
  //               JSON.stringify(res.data)
  //           );
  //           console.log("Shader Code : {}", shaderCodes);
  //           setShaderCodes(shaderCodes.set(metaInfo._id, res.data));
  //         })
  //         .catch((ex) => {
  //           console.log(
  //             `http://localhost:3000/api/meta/getshader/${metaInfo._id}` + ex
  //           );
  //         })
  //         .finally(() => {
  //           console.log("GET api/meta Request End");
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   });
  // }, [shaderNFTs]);

  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {shaderNFTs.map((shaderInfo, index) => (
            <Grid item key={index} xs={12}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {`Shader Code : ${shaderCodes.get(shaderInfo._id)}`}
              </Card>
              <FormControl fullWidth sx={{ m: 4 }}>
                Owner : ${shaderInfo.owner}
                Minter: ${shaderInfo.minter}
                Price : ${shaderInfo.price} ether
                <Button
                  onClick={tradeNFTHandler(shaderInfo._id, shaderInfo.price)}
                  sx={{
                    my: 2,
                    bgcolor: "#161B22",
                    color: "white",
                    display: "block",
                  }}
                >
                  {"Buy"}
                </Button>
              </FormControl>
              <FormControl fullWidth sx={{ m: 4 }}>
                Title : {shaderInfo.title}
                Description: {shaderInfo.description}
              </FormControl>
              ;
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default ExplorePage;
