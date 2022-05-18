import React from "react";
import Editor from "../components/Editor";
import { Container } from "@mui/material";
import { UserLoginInfo } from "./Interfaces";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

function ExplorePage(): JSX.Element {
  const [_anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const _handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function joinHandler() {
    /* eslint-disable   @typescript-eslint/no-non-null-assertion */
    console.log(localStorage.getItem("user")!);
    /* eslint-disable   @typescript-eslint/no-non-null-assertion */
    const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);
    console.log(userObj);

    try {
      const data = {
        email: userObj.user.email,
        password: userObj.user.password,
      };
      axios
        .post("http://localhost:3000/meta", JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
            Authorization: userObj.token,
          },
        })
        .then((res) => {
          console.log("signup requset success : " + res);
          // console.log(axios.defaults.headers.common['Authorization']);
          // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
          console.log(localStorage.getItem("user"));
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log("Bearer " + res.data.token);
          window.location.reload();
        })
        .catch((ex) => {
          console.log("signup requset fail : " + ex);
        })
        .finally(() => {
          console.log("Signup Request End");
        });
    } catch (e) {
      console.log(e);
    }
  }
  joinHandler();
  return (
    <Container sx={{ bgcolor: "#282C34" }}>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item key={0} xs={12}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Editor />
            </Card>
          </Grid>
          <Grid item key={1} xs={12}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Editor />
            </Card>
          </Grid>
          <Grid item key={2} xs={12}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Editor />
            </Card>
          </Grid>
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
