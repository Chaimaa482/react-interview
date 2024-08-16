import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import { setMovies, removeMovie } from "../redux/moviesReducer";
import { movies$ } from "../data/movies";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const selectedCategories = useSelector((state) => state.selectedCategories);
  const currentPage = useSelector((state) => state.currentPage);
  const moviesPerPage = useSelector((state) => state.moviesPerPage);

  useEffect(() => {
    movies$.then((movies) => {
      dispatch(setMovies(movies));
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (isConfirmed) {
      dispatch(removeMovie(id));
    }
  };

  // Filtrer les films en fonction des catégories sélectionnées
  const filteredMovies = selectedCategories.length
    ? movies.filter((movie) => selectedCategories.includes(movie.category))
    : movies;

  // Pagination sur les films filtrés
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <>
      <CategoryFilter />
      <div className="movie-list">
        {currentMovies.map((movie) => (
          <MovieCard
            id={movie.id}
            key={movie.id}
            title={movie.title}
            category={movie.category}
            likes={movie.likes}
            dislikes={movie.dislikes}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default MovieList;
