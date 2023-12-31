import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const MNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fullName, setFullName] = useState('');


  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.fullName) {
          setFullName(user.fullName);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

 /*  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const fullName = user.fullName;
      setFullName(fullName);
    }
  }, []); */
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/login'; // Redirect the user to the login page
  };

  const menuItems = [
    { text: "Manager Home", icon: <HomeIcon />, link: "/manager-home" },
    { text: "Profile Update", icon: <PersonIcon />, link: "/profile" },
    { text: "Orders", icon: <ShoppingBasketIcon />, link: "/orders" },
    { text: "Reviews", icon: <RateReviewIcon />, link: "/reviews" },
  ];


  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: /* "#00e676" */ "#1a237e"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         
            <Link to="/manager-home">
              <img src="ourlogo.png" alt="Logo" style={{ height: 70, marginRight: 10 }} />
            </Link>
            <Typography variant="subtitle1" component="div" style={{ display: "flex", flexDirection: "column" }}>
              ColdStore
            </Typography>
          </Typography>
          <p style={{ marginRight: "15%", fontSize: "24px" }}><b>Hi, Welcome Back {fullName}!!</b></p>

          {/* Add Links to Manager Home, Profile Update, Orders, and Reviews Pages */}
          {menuItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.link}
              color="inherit"
              startIcon={item.icon}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {item.text}
            </Button>
          ))}
          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.link}>
                {item.icon}
                <Typography variant="body1" sx={{ ml: 2 }}>
                  {item.text}
                </Typography>
              </ListItem>
            ))}
            <Divider />
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default MNav;
