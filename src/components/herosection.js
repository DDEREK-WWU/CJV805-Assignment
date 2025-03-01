import {React, useContext} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { MediaContext } from '../context/MediaContext';

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
    <div className="hero-section" style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]} // ✅ Enable slideshow features
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 7000, disableOnInteraction: false }} // ✅ Slideshow effect
        pagination={{ clickable: true }} // ✅ Adds pagination dots
        navigation // ✅ Enables next/prev buttons
        loop={true} // ✅ Ensures continuous looping
      >
        {topMedia.map((media) => (
          <SwiperSlide key={media.id}>
            <img 
              src={media.banner} 
              alt={media.title} 
              style={{ width: "100%", height: "500px", objectFit: "cover" }} 
            />
             <div className="slide-info">
              <h2>{media.title}</h2>
              <p>Genre: {media.genre} | Year: {media.year} | Rating: {media.rating}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;