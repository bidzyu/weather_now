import { Location, Weather, NotFound } from './pages';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GeoLoader } from './components/weather/Geo/GeoLoader';
import './app.module.scss';
import { ScrollChecker } from './components/ScrollChecker';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/location" element={<Location />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <GeoLoader />
      <ScrollChecker />
    </>
  );
}

export default App;
