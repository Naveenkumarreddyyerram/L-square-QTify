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
      <Footer />
    </>
  );
}

function App() {
  const [searchData, setSearchData] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const [topRes, newRes] = await Promise.all([
          axios.get("https://qtify-backend.labs.crio.do/albums/top"),
          axios.get("https://qtify-backend.labs.crio.do/albums/new"),
        ]);
        setSearchData([...(topRes.data || []), ...(newRes.data || [])]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSearchData();
  }, []);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

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
        onNext={() => {}}
        onPrev={() => {}}
      />
    </div>
  );
}

export default App;