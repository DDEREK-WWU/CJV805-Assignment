import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/auth"
    : "https://cjv805-backend.onrender.com/auth"; //

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/${userId}`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card sx={{ maxWidth: 500, padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome to your Dashboard
            </Typography>

            {user ? (
              <>
                <Typography variant="body1"><strong>Name:</strong> {user.firstName} {user.lastName}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
              </>
            ) : (
              <Typography variant="body2">Loading user info...</Typography>
            )}

            <Button onClick={handleLogout} sx={{ mt: 3 }} variant="contained" color="secondary">
              Log Out
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardPage;