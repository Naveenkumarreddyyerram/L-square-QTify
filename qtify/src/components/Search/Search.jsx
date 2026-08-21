import React from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import useAutocomplete from "@mui/material/useAutocomplete";
import { styled } from "@mui/system";
import { truncate } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

const Listbox = styled("ul")({
  width: "100%",
  margin: 0,
  padding: "10px 14px",
  position: "absolute",
  borderRadius: "14px",
  border: "1.5px solid var(--color-primary, #34c94b)",
  top: "56px",
  maxHeight: "450px",
  zIndex: 999,
  left: 0,
  right: 0,
  listStyle: "none",
  backgroundColor: "var(--color-black, #121212)",
  overflowY: "auto",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#333333",
    borderRadius: "4px",
  },
  "& li.Mui-focused": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
});

function Search({ searchData = [], placeholder }) {
  const navigate = useNavigate();

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    inputValue,
  } = useAutocomplete({
    id: "navbar-search-autocomplete",
    options: searchData || [],
    getOptionLabel: (option) => option?.title || "",
    onChange: (event, selectedOption) => {
      if (selectedOption?.slug) {
        navigate(`/album/${selectedOption.slug}`);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && value.slug) {
      navigate(`/album/${value.slug}`);
    } else if (groupedOptions.length > 0) {
      navigate(`/album/${groupedOptions[0].slug}`);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div {...getRootProps()} style={{ width: "100%" }}>
          <input
            name="album"
            className={styles.search}
            placeholder={placeholder}
            {...getInputProps()}
          />
        </div>
        <button className={styles.searchButton} type="submit">
          <SearchIcon />
        </button>
      </form>

      {inputValue.trim().length > 0 && groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const artists = option.songs
              ? option.songs.reduce((acc, song) => {
                  if (song.artists) acc.push(...song.artists);
                  return acc;
                }, [])
              : [];

            const artistString =
              artists.length > 0
                ? artists.join(", ")
                : option.description || "Artists names with comma separated values";

            return (
              <li
                key={option.id || option.slug || index}
                className={styles.listElement}
                {...getOptionProps({ option, index })}
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className={styles.albumImage}
                />
                <div className={styles.albumDetails}>
                  <p className={styles.albumTitle}>{option.title}</p>
                  <p className={styles.albumArtists}>
                    {truncate(artistString, 40)}
                  </p>
                </div>
                <div className={styles.albumFollows}>
                  {option.follows || 100} Follows
                </div>
              </li>
            );
          })}
        </Listbox>
      )}
    </div>
  );
}

export default Search;