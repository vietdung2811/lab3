import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchModel(
          "https://ccxwwr-8081.csb.app/api/user/list"
        );
        setUsers(data); // Lưu dữ liệu người dùng vào state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []); // Chỉ gọi API khi component lần đầu được render

  if (!users || users.length === 0) {
    return (
      <Typography variant="body1" sx={{ p: 2 }}>
        No users found.
      </Typography>
    );
  }

  return (
    <List component="nav" sx={{ width: "100%", padding: 0 }}>
      {users.map((user) => (
        <ListItem
          key={user._id}
          component={Link}
          to={`/users/${user._id}`}
          sx={{
            px: 3,
            py: 1.5,
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ListItemText
            primary={`${user.first_name} ${user.last_name}`}
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "0.95rem",
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default UserList;
