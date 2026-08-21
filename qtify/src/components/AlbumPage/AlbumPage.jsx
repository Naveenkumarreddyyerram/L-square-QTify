import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import styles from "./AlbumPage.module.css";

const SONGS_PER_PAGE = 13;

export default function AlbumPage({ onSongSelect }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const res = await axios.get("https://qtify-backend.labs.crio.do/albums/top");
        const match = res.data.find((item) => item.slug === slug);
        if (match) {
          setAlbum(match);
        } else {
          const resNew = await axios.get("https://qtify-backend.labs.crio.do/albums/new");
          const matchNew = resNew.data.find((item) => item.slug === slug);
          setAlbum(matchNew || null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAlbumData();
  }, [slug]);

  if (!album) return <div className={styles.loading}>Loading album...</div>;

  const songs = album.songs || [];
  const totalPages = Math.ceil(songs.length / SONGS_PER_PAGE);
  const startIndex = (page - 1) * SONGS_PER_PAGE;
  const currentSongs = songs.slice(startIndex, startIndex + SONGS_PER_PAGE);

  const formatDuration = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate("/")}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        Back to Home
      </button>

      <div className={styles.banner}>
        <img src={album.image} alt={album.title} className={styles.cover} />
        <div className={styles.details}>
          <h1 className={styles.title}>{album.title}</h1>
          <p className={styles.desc}>{album.description}</p>
          <p className={styles.stats}>
            {songs.length} Songs • {album.follows} Follows
          </p>
        </div>
      </div>

      <div className={styles.songTableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {currentSongs.map((song, i) => (
              <tr
                key={song.id || i}
                onClick={() => onSongSelect && onSongSelect(song, songs)}
                className={styles.row}
              >
                <td>{startIndex + i + 1}</td>
                <td className={styles.songTitleCell}>
                  <img src={song.image} alt={song.title} className={styles.songThumb} />
                  {song.title}
                </td>
                <td>{song.artists?.join(", ")}</td>
                <td>{formatDuration(song.durationInMs)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => setPage(val)}
              classes={{ ul: styles.paginationList }}
            />
          </div>
        )}
      </div>
    </div>
  );
}