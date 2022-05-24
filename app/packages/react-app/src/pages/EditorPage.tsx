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

function EditorPage(): JSX.Element {
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);
  const [values, setValues] = React.useState<MetadataAddInfo>({
    owner: userObj.user.username,
    price: 0,
    minter: userObj.user.username,
    title: "",
    description: "",
    shaderCode: "",
  });

  const handleChange = (prop: keyof MetadataAddInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShaderChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValues({ ...values, shaderCode: event.target.value });
  };

  const mintHandler = () => {
    console.log(values);
  };

  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Editor onChange={handleShaderChange}/>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={values.price}
          onChange={handleChange("price")}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          value={values.title}
          onChange={handleChange("title")}
          variant="filled"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id="filled-multiline-static"
          label="Multiline"
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
