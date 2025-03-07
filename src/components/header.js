import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Switch } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";

const Header = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: darkMode ? "#222" : "#3d3838", color: darkMode ? "#fff" : "#3d3838" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                
                {/* Logo Section */}
                <Box display="flex" alignItems="center">
                    <IconButton component={Link} to="/">
                        <LiveTvIcon sx={{ color: "green" }} fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 ,color: "#fff"}}>
                        NetHuDu
                    </Typography>
                </Box>

                {/* Navigation Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                    <Link to="/movies&tvshows" className="nav-link">Movies/TV Shows</Link>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Switch checked={darkMode} onChange={toggleTheme} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;