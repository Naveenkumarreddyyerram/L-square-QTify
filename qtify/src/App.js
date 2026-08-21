import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import Footer from "./components/Footer/Footer";
import SongPlayer from "./components/SongPlayer/SongPlayer";
import AlbumPage from "./components/AlbumPage/AlbumPage";

function HomePage({ onSongSelect }) {
  return (
    <>
      <Hero />
      <Section
        title="Top Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/top"
      />
      <Section
        title="New Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/new"
      />
      <Section
        title="Songs"
        endpoint="https://qtify-backend.labs.crio.do/songs"
        isSongs={true}
        onSongSelect={onSongSelect}
      />
    </>
  );
}

function App() {
  const [searchData, setSearchData] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRes, newRes, songsRes] = await Promise.all([
          axios.get("https://qtify-backend.labs.crio.do/albums/top"),
          axios.get("https://qtify-backend.labs.crio.do/albums/new"),
          axios.get("https://qtify-backend.labs.crio.do/songs"),
        ]);
        setSearchData([...(topRes.data || []), ...(newRes.data || [])]);
        setPlaylist(songsRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSongSelect = (song, customPlaylist = null) => {
    const activeList = customPlaylist && customPlaylist.length > 0 ? customPlaylist : playlist;
    if (customPlaylist && customPlaylist.length > 0) {
      setPlaylist(customPlaylist);
    }
    const idx = activeList.findIndex((item) => (item.id || item.title) === (song.id || song.title));
    setCurrentIndex(idx !== -1 ? idx : 0);
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? playlist.length - 1 : prevIndex - 1));
  };

  const currentSong = currentIndex >= 0 ? playlist[currentIndex] : null;

  return (
    <div className="App">
      <Navbar searchData={searchData} />
      <Routes>
        <Route
          path="/"
          element={<HomePage onSongSelect={handleSongSelect} />}
        />
        <Route
          path="/album/:slug"
          element={<AlbumPage onSongSelect={handleSongSelect} />}
        />
      </Routes>
      <Footer />
      <SongPlayer
        currentSong={currentSong}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}

export default App;