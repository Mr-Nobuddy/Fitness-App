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
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [image,setImage] = React.useState("");
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    axios.get("/logout")
    .then((res) => {
      // console.log("logged out succesfully");
      // navigate("/");
      // res.redirect('/');
      document.location.replace("/");
    })
    .catch((err) => {
      console.log(err)
    })
  }
  React.useEffect(() => {
    axios.get('/getimage')
    .then((response) => {
      // console.log(response)
      setImage(response.data[0].image)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])
  const pages = [
    <Typography
      sx={{ fontSize: "0.9rem",fontFamily:`"Fraunces", serif` }}
      onClick={() => navigate("/caloriecounter")}
    >
      Calorie Counter
    </Typography>,
    <Typography
      sx={{ fontSize: "0.9rem",fontFamily:`"Fraunces", serif` }}
      onClick={() => navigate("/trackworkout")}
    >
      Track Workout
    </Typography>,
    <Typography
      sx={{ fontSize: "0.9rem",fontFamily:`"Fraunces", serif` }}
      onClick={() => navigate("/searchworkout")}
    >
      Search workout
    </Typography>,
    <Typography
      sx={{ fontSize: "0.9rem",fontFamily:`"Fraunces", serif` }}
      onClick={() => navigate("/searchrecepies")}
    >
      Search recepies
    </Typography>,
  ];
  const settings = [
    <Typography
      sx={{ fontSize: "1.1rem",fontFamily:`"Fraunces", serif`,display:"flex",justifyContent:"center",alignItems:"center",gap:0.5 }}
      onClick={() => navigate("/profile")}
    >
      <CgProfile size={20}/> Profile
    </Typography>,
    <Typography sx={{ fontSize: "1.1rem",fontFamily:`"Fraunces", serif`,display:"flex",justifyContent:"center",alignItems:"center",gap:0.5 }} onClick={handleLogOut}>
      <IoLogOutOutline size={25}/> Log out
    </Typography>,
  ];
  return (
    <Box sx={{ margin: "20px" }}>
      <AppBar position="static" sx={{ borderRadius: "50px",backgroundColor:"#5AB2FF" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" } }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/images/dumbbell_17042215.png"
                sx={{ width: 60, height: 60 }}
              />
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
              href="#app-bar-with-responsive-menu"
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={image} />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
