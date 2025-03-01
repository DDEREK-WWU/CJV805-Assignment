import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import RedditIcon from '@mui/icons-material/Reddit';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <nav className="footer-nav">
          <ul className="footer-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies&tvshows">Movies/TvShows</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><XIcon /></a>
          <a href="https://reddit.com" target="_blank" rel="noopener noreferrer"><RedditIcon /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-text">NetHuDu &copy; {new Date().getFullYear()} | All Rights Reserved</p>
        <p className="footer-disclaimer">
          This website is for educational purposes only and does not host or stream any copyrighted content.
        </p>
      </div>
    </footer>
  );
};

export default Footer;