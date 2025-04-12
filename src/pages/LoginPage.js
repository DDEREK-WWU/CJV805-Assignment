import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  // Dynamically set API URL
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/auth"
      : "https://cjv805-backend.onrender.com/auth"; //

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });



      if (response.ok) {
        const data = await response.json(); // Expecting full user object
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userEmail", data.email); // Optional

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        const errorMessage = await response.text();
        alert("Login failed: " + errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Network error. Please try again.");
    }
  };



  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Login to NetHuDu
            </Typography>


            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={updateField}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={updateField}
                fullWidth
                margin="normal"
              />

              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
              <Button variant="contained" color="primary" component={Link} to="/Signup" fullWidth sx={{ mt: 2 }}>
                Create a New Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Footer />
    </Box>
  );

};

export default LoginPage;
