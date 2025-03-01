import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid2, Box } from "@mui/material";

const ContentSection = () => {
  // ✅ Content Data (Can be expanded)
  const contentData = [
    {
      title: "🎬 The Magic of Hollywood",
      description:
        "Hollywood is the heart of the entertainment industry, producing some of the world's most iconic movies. From classic films to modern blockbusters, the industry has shaped global pop culture.",
      image: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    },
    {
      title: "🎥 Behind the Scenes",
      description:
        "Every movie is a massive production involving actors, directors, and thousands of crew members. Did you know that the average Hollywood movie takes about 1-2 years to complete?",
      image: "https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    },
    {
      title: "🏆 Hollywood's Biggest Movies",
      description:
        "Some of the highest-grossing movies include *Avengers: Endgame*, *Avatar*, and *Titanic*. These films have made billions at the box office and continue to break records.",
      image: "https://image.tmdb.org/t/p/original/ruziOM4OlILvyrOdChvvFqy4Ggw.jpg",
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Grid2 container spacing={3} justifyContent="center">
        {contentData.map((item, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia component="img" height="200" image={item.image} alt={item.title} />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ContentSection;