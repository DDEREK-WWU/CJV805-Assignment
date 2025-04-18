import React, {useContext, useState, useEffect} from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import {MediaContext} from "../context/MediaContext";
import {Grid , Card, CardMedia, CardContent, Typography, Pagination} from "@mui/material";
import {Link} from "react-router-dom";


const MediaListPage = () => {

    const {movies = [], tvShows = []} = useContext(MediaContext);

    const shuffleArray =(array) =>{
        return [...array].sort(() => Math.random() - 0.5);
    };

    const allMedia = shuffleArray([...movies, ...tvShows]);

    const [page, setPage] = useState(1);
    const itemsPerPage = 24;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedMedia = allMedia.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {
        setPage(value);
      };
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [page]);
    return (
        <div>
            <Header />
        <div style={{ padding: "100px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          🎬 Movies & TV Shows Listing
        </Typography>

        {/* Grid Layout */}
        <div className="featured-section">
        <Grid container spacing={2}justifyContent="center">
          {displayedMedia.map((media) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={media.id} >
              <Link to={`/media/${media.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card sx={{ maxWidth: 250, margin: "auto", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                  <CardMedia component="img" height="350" image={media.smallPoster} alt={media.title} />
                  <CardContent>
                    <Typography variant="caption" align="center">{media.title}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        </div>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(allMedia.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        />
      </div>
            
            <Footer />
    </div>
    );
};

export default MediaListPage;