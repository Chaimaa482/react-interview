import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import { setMovies, setLoading, setError, removeMovie } from "../redux/moviesReducer";
import { movies$ } from "../data/movies";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, selectedCategories, currentPage, moviesPerPage } = useSelector((state) => state);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading()); 
      try {
        const movies = await movies$;
        dispatch(setMovies(movies));
      } catch (error) {
        dispatch(setError("Failed to fetch movies")); 
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (isConfirmed) {
      dispatch(removeMovie(id));
    }
  };

  const filteredMovies = selectedCategories.length
    ? movies.filter((movie) => selectedCategories.includes(movie.category))
    : movies;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
