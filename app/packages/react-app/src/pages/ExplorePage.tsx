import React from "react";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { UserLoginInfo, MetadataInfo, ShaderQueryInfo } from "./Interfaces";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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

  const tradeHandler = async (metaId: string, price: number) => {
    const mstaddr = await getMstbyId(metaId)
    const tstaddr = await getTstbyMst(mstaddr)
    const wallet = getWallet();
  
    onPurchase(wallet, tstaddr, mstaddr, 1, price)
    .then(() => {
      // Modify owner of this meta info with new owner
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      "NFT Trading Success"
    })

    // change owner of the shader
  };

  const queryShaderCode = (token: string, id: string) => {
    try {
      console.log("queryShaderCode token : {}", token);
      axios
        .post(`http://localhost:3000/api/meta/getshader/${id}`, {
          headers: {
            "Content-Type": `application/json`,
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(
            "POST api/meta/getshader Request success : " +
              JSON.stringify(res.data)
          );
          setShaderCodes(shaderCodes.set(id, res.data));
        })
        .catch((ex) => {
          console.log(`http://localhost:3000/api/meta/getshader/${id}` + ex);
        })
        .finally(() => {
          console.log("POST api/meta Request End");
        });
    } catch (e) {
      console.log(e);
    }
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
            console.log(typeof res.data.data);
            for (let idx = 0; idx < res.data.data.length; idx++) {
              console.log("ShaderNFT : {}", res.data.data[idx]);
              queryShaderCode(userObj.token, res.data.data[idx]._id);
            }
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

  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item key={0} xs={12}></Grid>
        </Grid>
      </Container>
    </Container>
  );
}

// {itemData.map((item) => (
//   <ImageListItem key={item.img}>
//     <img
//       src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
//       srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//       alt={item.title}
//       loading="lazy"
//     />
//   </ImageListItem>
// ))}

export default ExplorePage;

// {shaderNFTs.map((shaderInfo) => {
//   <Card
//     sx={{
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//     }}
//   >
//     <Editor
//       defaultShader={shaderCodes.get(shaderInfo._id)!.shader}
//     />
//   </Card>;
// <FormControl fullWidth sx={{ m: 1 }}>
//   <Button
//     key={"Mint"}
//     onClick={tradeHandler}
//     sx={{ my: 2, bgcolor: "#161B22", color: "white", display: "block" }}
//   >
//     {"Mint"}
//   </Button>
// </FormControl>;
// })}
