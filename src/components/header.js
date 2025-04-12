import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Switch } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const Header = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceRef = useRef(null);
    const navigate = useNavigate();

    const API_BASE_URL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8080/api"
            : "https://cjv805-backend.onrender.com/api";

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (searchQuery.trim() === "") {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        debounceRef.current = setTimeout(() => {
            fetch(`${API_BASE_URL}/media/search?title=${encodeURIComponent(searchQuery.trim())}`)
                .then(res => res.json())
                .then(data => {
                    setSuggestions(data);
                    setShowDropdown(true);
                })
                .catch(err => console.error("Search error:", err));
        }, 300); // 300ms debounce
    }, [searchQuery]);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: darkMode ? "#222" : "#3d3838", color: darkMode ? "#fff" : "#3d3838" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>

                {/* Logo Section */}
                <Box display="flex" alignItems="center">
                    <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                        <LiveTvIcon sx={{ color: "green" }} fontSize="large" />
                        <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1, color: "#fff", mt: 1 }}>
                            NetHuDu
                        </Typography>
                    </Link>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        minWidth: 300,
                        display: "flex",
                        alignItems: "flex-start", // instead of center
                        justifyContent: "center",
                        flexDirection: "column"   // stack vertically
                    }}
                >
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            backgroundColor: darkMode ? "#333" : "#fff",
                            borderRadius: 1,
                            width: 600,
                            '& .MuiOutlinedInput-root': {
                                color: darkMode ? '#fff' : '#000', // text color
                                '& fieldset': {
                                    borderColor: darkMode ? '#888' : '#ccc', // border
                                },
                                '&:hover fieldset': {
                                    borderColor: darkMode ? '#aaa' : '#888',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: darkMode ? '#fff' : '#3d3838',
                                }
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: darkMode ? '#bbb' : '#888', // placeholder
                                opacity: 1,
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchQuery ? (
                                        <IconButton onClick={() => setSearchQuery("")}>
                                            <CloseIcon />
                                        </IconButton>
                                    ) : (
                                        <SearchIcon />
                                    )}
                                </InputAdornment>
                            )
                        }}
                        onFocus={() => {
                            if (suggestions.length > 0) setShowDropdown(true);
                        }}
                        onBlur={() => {
                            // Delay to allow clicking dropdown items
                            setTimeout(() => setShowDropdown(false), 200);
                        }}
                    />
                    {showDropdown && suggestions.length > 0 && (
                        <Paper
                            elevation={3}
                            sx={{
                                position: "absolute",
                                top: "100%",
                                width: "100%",
                                zIndex: 99,
                                mt: 1,
                                backgroundColor: darkMode ? "#2a2a2a" : "#fff",
                                color: darkMode ? "#fff" : "#000"
                            }}
                        >
                            <List>
                                {suggestions.map((media) => (
                                    <ListItem
                                        button
                                        key={media.id}
                                        onMouseDown={() => {
                                            navigate(`/media/${media.id}`);
                                            setSearchQuery("");
                                            setShowDropdown(false);
                                        }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: darkMode ? "#444" : "#f0f0f0"
                                            }
                                        }}
                                    >
                                        <ListItemText primary={media.title} secondary={`${media.genre} | ${media.year}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}
                </Box>

                {/* Navigation Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", color: "#fff" }}>
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