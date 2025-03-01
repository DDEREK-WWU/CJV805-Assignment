
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect} from 'react';
import MediaProvider from './context/MediaContext';
import HomePage from './pages/HomePage';
import MediaListPage from './pages/MediaListPage';
import MediaDetailsPage from './pages/MediaDetailsPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ResetScrollTop from './components/ResetScrollTop';
import { ThemeProviderWrapper } from './context/ThemeContext';



function App() {

  useEffect(() => {
    document.title = "NetHuDu";
  }, []);

  return (
    <ThemeProviderWrapper>
      <Router>
        <ResetScrollTop />
        <MediaProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies&tvshows" element={<MediaListPage />} />
            <Route path="/media/:id" element={<MediaDetailsPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
        
          </Routes>
        </MediaProvider>

      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
