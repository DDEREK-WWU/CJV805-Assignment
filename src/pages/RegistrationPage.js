import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";

const RegistrationPage = () => {
  // Dynamically set API URL
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/auth"
      : "https://cjv805-backend.onrender.com/auth"; //

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);
        setShowSuccessModal(true);
      }
      else {
        if (data.firstName || data.lastName || data.email || data.password) {
          const firstFieldWithError = Object.keys(data)[0];
          alert(`Registration failed: ${data[firstFieldWithError]}`);
        } else if (data.message) {
          // Fallback for custom single-message errors
          alert(`Registration failed: ${data.message}`);
        } else {
          alert("Registration failed due to an unknown error.");
        }
      }
    }
    catch (error) {
      console.error("Error during registration:", error);
      // Handle network error (e.g., show error message)
    }


  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Create a New Account
            </Typography>


            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={updateField}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={updateField}
                fullWidth
                margin="normal"
              />
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
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={updateField}
                fullWidth
                margin="normal"
              />

              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Footer />
      <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography>You have successfully registered! You will now be redirected to the login page.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/login"); // or wherever your login page is
            }}
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

};

export default RegistrationPage;
