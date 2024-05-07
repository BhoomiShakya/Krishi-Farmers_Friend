import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // Global state
  const isLogin = useSelector((state) => state.isLogin) || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State
  const [value, setValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Logout function
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successful");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  // Menu handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" style={{backgroundColor:"green"}}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
          कृषि
          </Typography>
          {isLogin && (
            <Box>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Home" component={Link} to="/home" />
                <Tab label="Crop Assessment" component={Link} to="/crop-assessment" />
                <Tab label="Schedule" component={Link} to="/schedule" />
                <Tab label="Blog Section" onClick={handleMenuClick} />
              </Tabs>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {handleMenuClose(); navigate("/blogs");}}>
                  Blogs
                </MenuItem>
                <MenuItem onClick={() => {handleMenuClose(); navigate("/my-blogs");}}>
                  My Blogs
                </MenuItem>
                <MenuItem onClick={() => {handleMenuClose(); navigate("/create-blog");}}>
                  Create Blog
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!isLogin ? (
            <Box>
              <Button component={Link} to="/login" sx={{ mx: 1, color: "white" }}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ mx: 1, color: "white" }}>
                Register
              </Button>
            </Box>
          ) : (
            <Button onClick={handleLogout} sx={{ mx: 1, color: "white" }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
