import React, { useContext } from 'react';
import { MediaContext } from '../context/MediaContext';
import {Grid2 , Card, CardMedia, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const FeaturedMedia = () => {
    const { movies = [] , tvShows = [] } = useContext(MediaContext);
    const featuredMovies = movies.filter(movie => movie.genre && movie.genre.toLowerCase().includes("animation"));
    const featuredTvShows = tvShows.filter(tvShow => tvShow.genre && tvShow.genre.toLowerCase().includes("family"));

    const getRandomMovies =  (moviesArray, num) => {
        const randomMovies = [...moviesArray].sort(() => 0.5 - Math.random());
        return randomMovies.slice(0, num);  
    }

    const getRandomTvShows =  (TvShowsArray, num) => {
        const randomTvShows = [...TvShowsArray].sort(() => 0.5 - Math.random());
        return randomTvShows.slice(0, num);  
    }

    const displayMovies = getRandomMovies(featuredMovies, 6);
    const displayTvShows = getRandomTvShows(featuredTvShows, 6);

    return (
    <div className="featured-section">
      <Typography variant="h4" align="center" sx = {{marginBottom: "30px"}}>Featured Movies</Typography>
          <Grid2 container spacing={3} justifyContent="center">
                 {displayMovies.map((media) => (
                   <Grid2 item key={media.id} xs={3}>
                     <Link to={`/media/${media.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                       <Card sx={{maxWidth: 240, margin: "auto", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                         <CardMedia component="img" height="350" image={media.smallPoster} alt={media.title} />
                         <CardContent>
                           <Typography variant="caption" align="center">{media.title}</Typography>
                         </CardContent>
                       </Card>
                     </Link>
                   </Grid2>
                 ))}
               </Grid2>
      <Typography variant="h4" align="center" sx={{marginTop: "30px"}}>Featured TvShows</Typography>
               <Grid2 container spacing={3} justifyContent="center" sx={{marginTop: "30px"}}>
                 {displayTvShows.map((media) => (
                   <Grid2 item key={media.id} xs={3}>
                     <Link to={`/media/${media.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                       <Card sx={{maxWidth: 240, margin: "auto", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                         <CardMedia component="img" height="350" image={media.smallPoster} alt={media.title} />
                         <CardContent>
                           <Typography variant="caption" align="center">{media.title}</Typography>
                         </CardContent>
                       </Card>
                     </Link>
                   </Grid2>
                 ))}
               </Grid2>
      </div>
    );
}

export default FeaturedMedia;