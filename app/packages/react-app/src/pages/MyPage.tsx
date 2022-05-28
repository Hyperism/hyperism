import React from "react";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { MetadataInfo, ShaderQueryInfo } from "./Interfaces";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { GetAllMetadatasWithOwner, GetShaderCode } from "./RestUtils";

function MyPage(): JSX.Element {
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
      GetAllMetadatasWithOwner((metaDataInfos: MetadataInfo[]) => {
        if (metaDataInfos != null) {
          metaDataInfos.forEach((metaInfo) => {
            setShaderNFTs([...shaderNFTs, metaInfo]);
            console.log("ShaderNFTs : {}", shaderNFTs);
            try {
              GetShaderCode(metaInfo._id, (shaderQuery: ShaderQueryInfo) => {
                console.log("ShaderQuery : {}", shaderQuery);
                setShaderCodes(shaderCodes.set(metaInfo._id, shaderQuery));
              });
            } catch (e) {
              console.error(e);
            }
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {shaderNFTs.map((shaderInfo, index) => (
            <Grid item key={index} xs={12}>
              <FormControl fullWidth sx={{ m: 4 }}>
                <Editor
                  defaultShader={shaderCodes.get(shaderInfo._id)?.shader}
                />
                <TextField
                  id="filled-basic"
                  label={"Owner : " + shaderInfo.owner}
                  variant="filled"
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  id="filled-basic"
                  label={"Minter : " + shaderInfo.minter}
                  variant="filled"
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  id="filled-basic"
                  label={"Price : " + shaderInfo.price + " ETH"}
                  variant="filled"
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  id="filled-basic"
                  label={"Title : " + shaderInfo.title}
                  variant="filled"
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  id="filled-basic"
                  label={"Description : " + shaderInfo.description}
                  variant="filled"
                  inputProps={{ readOnly: true }}
                />
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default MyPage;
