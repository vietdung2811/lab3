import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const path = location.pathname;

  const getContextText = () => {
    // Nếu đang ở trang user list
    if (path === "/users") {
      return "User List";
    }

    // Nếu đang ở trang user detail hoặc photo
    const userIdMatch = path.match(/^\/(users|photos)\/([^/]+)$/);
    if (userIdMatch) {
      const [, type, userId] = userIdMatch;
      const user = models.userModel(userId);
      if (user) {
        return type === "users"
          ? `${user.first_name} ${user.last_name}`
          : `Photos of ${user.first_name} ${user.last_name}`;
      }
      return type === "users" ? "User Details" : "User Photos";
    }

    // Default
    return "Photo Sharing App";
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Left side - Your name */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Đào Việt Dũng{" "}
          {/*Name */}
        </Typography>

        {/* Right side - Context */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "medium",
            textTransform: "capitalize",
          }}
        >
          {getContextText()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
