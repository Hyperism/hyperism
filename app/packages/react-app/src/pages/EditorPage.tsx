import React from "react";
import Button from "@mui/material/Button";
import Editor from "../components/Editor";
import { Container, InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { MetadataAddInfo, UserLoginInfo } from "./Interfaces";
import { Minting } from "@my-app/contracts";
import {
  StoreMintShaderTokenID,
  StoreTradeShaderTokenAddress,
  StoreNFTMetadataInfo,
} from "./RestUtils";

function EditorPage(): JSX.Element {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);
  const [values, setValues] = React.useState<MetadataAddInfo>({
    owner: userObj.user.username,
    price: 0,
    minter: userObj.user.username,
    title: "",
    description: "",
    shader: "",
  });

  const handleChange =
    (prop: keyof MetadataAddInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleShaderChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValues({ ...values, shader: event.target.value });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, price: Number(event.target.value) });
  };

  const minting = async (metaId: string, price: number) => {
    const { mstAddress, tstAddress } = await Minting(metaId, 1, price);
    StoreMintShaderTokenID(mstAddress, metaId);
    StoreTradeShaderTokenAddress(mstAddress, tstAddress);
  };

  const navigate = useNavigate();
  const mintHandler = () => {
    try {
      StoreNFTMetadataInfo(values, (metaId: string) => {
        console.log(`MetaId : ${metaId}`);
        minting(metaId, 5 /* values.price */);
        navigate("/main");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Editor onChange={handleShaderChange} />
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={values.price}
          onChange={handlePriceChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Price"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id="filled-textarea"
          label="Title"
          placeholder="Placeholder"
          value={values.title}
          onChange={handleChange("title")}
          variant="filled"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={values.description}
          onChange={handleChange("description")}
          variant="filled"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button
          key={"Mint"}
          onClick={mintHandler}
          sx={{ my: 2, bgcolor: "#161B22", color: "white", display: "block" }}
        >
          {"Mint"}
        </Button>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button
          key={"Close"}
          onClick={() => useNavigate()("/")}
          sx={{ my: 2, bgcolor: "#161B22", color: "white", display: "block" }}
        >
          {"Close"}
        </Button>
      </FormControl>
    </Container>
  );
}

export default EditorPage;
