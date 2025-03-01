import React, {useContext} from "react";
import {Link} from "react-router-dom";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Switch } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
    const {darkMode, toggleTheme} = useContext(ThemeContext);

    return(
        <header className = "header">
            <div className = "logo">
                <Link to = "/" className = "logo-link"> 
                <LiveTvIcon fontSize="large" className="logo-icon" />
                <h1 className = "logo-text">NetHuDu</h1>
                </Link>
                <Link to="/movies&tvshows" className="nav-link first-logo-nav-link">Movies/Tv Shows</Link>

            </div>
            <nav className = "nav">
                <Link to="/signup" className="nav-link">Sign Up</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Switch checked = {darkMode} onChange = {toggleTheme} label = "ss"></Switch>

            </nav>
        </header>

    );


};

export default Header;