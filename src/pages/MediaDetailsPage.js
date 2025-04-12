import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MediaContext } from "../context/MediaContext";
import { Typography, Card, CardMedia, Button, Box } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/Footer";

const MediaDetailsPage = () => {
  const { movies = [], tvShows = [] } = useContext(MediaContext);
  const { id } = useParams();
  
  // Find the media item by matching its ID
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
            minHeight: "100vh", // Ensures the image covers the full viewport height
            backgroundImage: `url(${media.largePoster})`, // Large poster image
            backgroundSize: "cover", // Ensures the image scales properly
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", // Prevents image repetition
            filter: "brightness(80%)",
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
              width: { xs: "90%", md: "70%" }, // Make width responsive
              backgroundColor: "rgba(0, 0, 0, 0.7)", 
              padding: { xs: "15px", sm: "20px", md: "30px" },
              borderRadius: "10px",
              color: "white",
            }}
          >
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" } }}
            >
              {media.title}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ opacity: 0.9, fontSize: { xs: "0.9rem", md: "1.1rem" } }}
            >
              {media.genre}
            </Typography>

            {/* Small Poster & Description */}
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: 3, 
                flexWrap: "wrap", // Makes content stack on mobile
                marginTop: 3 
              }}
            >
              <Card sx={{ maxWidth: 180, backgroundColor: "transparent", boxShadow: "none" }}>
                <CardMedia 
                  component="img" 
                  image={media.smallPoster} 
                  alt={media.title}
                  sx={{ width: "100%", borderRadius: "5px" }}
                />
              </Card>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: "0.9rem", md: "1rem" }, 
                  textAlign: "left", 
                  maxWidth: "400px" 
                }}
              >
                {media.synopsis}
              </Typography>
            </Box>

            {/* Rent & Buy Buttons */}
            <Box 
              sx={{ 
                marginTop: 3, 
                display: "flex", 
                gap: 2, 
                flexWrap: "wrap", 
                justifyContent: "center" 
              }}
            >
              <Button 
                variant="contained" 
                color="primary"
                sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, px: { xs: 2, md: 3 }, py: { xs: 1, md: 1.5 } }}
              >
                Rent Now: {media.rentPrice}
              </Button>
              <Button 
                variant="contained" 
                color="secondary"
                sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, px: { xs: 2, md: 3 }, py: { xs: 1, md: 1.5 } }}
              >
                Buy Now: {media.purchasePrice}
              </Button>
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