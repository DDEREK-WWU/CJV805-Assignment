import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MediaContext } from "../context/MediaContext";
import { Typography, Card, CardMedia, Button, Box } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/Footer";

const MediaDetailsPage = () => {
  const { movies = [], tvShows = [] } = useContext(MediaContext);
  const { id } = useParams();
  
  //  Find the media item by matching its ID
  const media = [...movies, ...tvShows].find((m) => m.id.toString() === id);

  if (!media) {
    return <Typography variant="h4" align="center">Media Not Found</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      {/*  Main Content Section (Expands to push Footer down) */}
      <Box sx={{ flex: 1 }}>
        
        {/*  Banner Section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "844px",
            backgroundImage: `url(${media.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "brightness(75%)",
          }}
        >
          {/*  Content Overlay (Centered on Banner) */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "80%",
              backgroundColor: "rgba(0, 0, 0, 0.6)", 
              padding: "30px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <Typography variant="h3" fontWeight="bold">{media.title}</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>{media.genre} | {media.year}</Typography>

            {/* Small Poster & Description */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 3 }}>
              <Card sx={{ maxWidth: 200, backgroundColor: "transparent", boxShadow: "none" }}>
                <CardMedia component="img" image={media.poster} alt={media.title} />
              </Card>
              <Typography variant="body1">{media.overview}</Typography>
            </Box>

            {/* Rent & Buy Buttons */}
            <Box sx={{ marginTop: 3 }}>
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>Rent Now: {media.rent}</Button>
              <Button variant="contained" color="secondary">Buy Now: {media.buy}</Button>
            </Box>
          </Box>
        </Box>

      </Box>

      {/* Footer Stays at Bottom */}
      <Footer />
    </Box>
  );
};

export default MediaDetailsPage;