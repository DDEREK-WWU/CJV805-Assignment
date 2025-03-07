import { React, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { MediaContext } from '../context/MediaContext';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSection = () => {
  const { movies = [], tvShows = [] } = useContext(MediaContext);

  const topMovies = movies.sort((a, b) => b.rating - a.rating).slice(0, 5);
  const topTvShows = tvShows.sort((a, b) => b.rating - a.rating).slice(0, 5);

  const topMedia = [...topMovies, ...topTvShows];

  return (
    <div className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]} 
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 7000, disableOnInteraction: false }} 
        pagination={{ clickable: true }} 
        navigation 
        loop={true} 
      >
        {topMedia.map((media) => (
          <SwiperSlide key={media.id}>
            <Link to={`/media/${media.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img 
                src={media.banner} 
                alt={media.title} 
                className="hero-image" 
              />
              <div className="slide-info">
                <h2>{media.title}</h2>
                <p>Genre: {media.genre} | Year: {media.year} | Rating: {media.rating}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;