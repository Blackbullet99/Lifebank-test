import React, { useState, useEffect } from "react";
import { getFilmList } from "../../services/itemListService";
import { toast } from "sonner";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Card from "../Card/Card";
import styles from "./styles.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ItemList = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFilmsList = async () => {
      setLoading(true);
      try {
        const data = (await getFilmList()).data;
        const filmList = data?.results;
        setFilms(filmList);
        toast.success("Films list fetched successfully.");
      } catch (error) {
        setError(error.message || "An error occurred");
        toast.error("An error occurred while fetching films list.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilmsList();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedFilms = films.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      {loading ? (
        <LoadingSpinner width={"2rem"} height={"2rem"} />
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.itemList__container}>
          {displayedFilms.map((film) => (
            <div key={film.title} className={styles.itemList__card}>
              <Card>
                <h3 className={styles.title}>{film.title}</h3>
                <p>{film.opening_crawl}</p>
              </Card>
            </div>
          ))}
        </div>
      )}
      <Stack spacing={2} className={styles.pagination}>
        <Pagination
          count={Math.ceil(films.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          sx={{ button: { color: "red" } }}
        />
      </Stack>
    </div>
  );
};

export default ItemList;
