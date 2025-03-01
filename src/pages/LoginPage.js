import React , {useState} from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";

const LoginPage = () => {


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
    const handleSubmit = (e) => {
        e.preventDefault();

      };
    

    return(
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
                onChange = {updateField}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange = {updateField}
                fullWidth
                margin="normal"
              />
              
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
              <Button variant="contained" color="primary" component = {Link} to = "/Signup" fullWidth sx={{ mt: 2 }}>
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
