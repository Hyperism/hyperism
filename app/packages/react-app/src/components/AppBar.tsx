import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../ethereumLogo.png";
import { Link } from "react-router-dom";

const pages = ["Main", "Explore", "Editor", "MyPages"];

const ResponsiveAppBar = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [avatarIcon, setAvartarIcon] = React.useState<string>(
    "/static/images/avatar/2.jpg"
  );

  React.useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setAvartarIcon(logo);
    }
  });

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "consolas",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hyperism
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hyperism
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key={"Main"}
              component={Link}
              to="/main"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Main
            </Button>
            <Button
              key={"Explore"}
              component={Link}
              to="/explore"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Explore
            </Button>
            <Button
              key={"Editor"}
              component={Link}
              to="/editor"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Editor
            </Button>
            {localStorage.getItem("user") ? (
              <Button
                key={"MyPages"}
                component={Link}
                to="/explore"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                MyPages
              </Button>
            ) : (
              <Button
                key={"Login"}
                component={Link}
                to="/login"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatarIcon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{"Profile"}</Typography>
              </MenuItem>
              <MenuItem key={"Account"} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{"Account"}</Typography>
              </MenuItem>
              <MenuItem key={"Dashboard"} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{"Dashboard"}</Typography>
              </MenuItem>
              <MenuItem
                key={"Logout"}
                onClick={() => {
                  if (localStorage.getItem("user") != null) {
                    localStorage.removeItem("user");
                  }
                  window.location.reload();
                }}
              >
                <Typography textAlign="center">{"Logout"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
