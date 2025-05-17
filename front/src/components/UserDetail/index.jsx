import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Divider, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchModel(
          `https://ccxwwr-8081.csb.app/api/user/${userId}`
        );
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) {
      getUser();
    }
  }, [userId]);

  if (!user) {
    return (
      <Typography variant="h6" color="error" sx={{ p: 3 }}>
        User not found.
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Location
        </Typography>
        <Typography variant="body1">
          {user.location || "No location specified"}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Occupation
        </Typography>
        <Typography variant="body1">
          {user.occupation || "No occupation specified"}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Description
        </Typography>
        <Typography variant="body1">
          {user.description || "No description available"}
        </Typography>
      </Box>

      <Button
        component={Link}
        to={`/photos/${userId}`}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        View Photos
      </Button>
    </Paper>
  );
}

export default UserDetail;
