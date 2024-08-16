const initialState = {
  movies: [],
  categories: [],
  selectedCategories: [],
  currentPage: 1,
  moviesPerPage: 8,
  loading: false, // New loading state
  error: null, // New error state
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES": {
      const categories = [
        ...new Set(action.payload.map((movie) => movie.category)),
      ];
      return { ...state, movies: action.payload, categories, loading: false, error: null };
    }
    case "REMOVE_MOVIE": {
      const remainingMovies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      const remainingCategories = [
        ...new Set(remainingMovies.map((movie) => movie.category)),
      ];
      return {
        ...state,
        movies: remainingMovies,
        categories: remainingCategories,
      };
    }
    case "SET_LOADING":
      return { ...state, loading: true, error: null }; // Set loading state
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload }; // Set error state
    case "TOGGLE_LIKE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload
            ? {
                ...movie,
                likes: movie.likes + (movie.hasLiked ? -1 : 1),
                hasLiked: !movie.hasLiked,
                dislikes: movie.hasDisliked
                  ? movie.dislikes - 1
                  : movie.dislikes,
                hasDisliked: false,
              }
            : movie
        ),
      };
    case "TOGGLE_DISLIKE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload
            ? {
                ...movie,
                dislikes: movie.dislikes + (movie.hasDisliked ? -1 : 1),
                hasDisliked: !movie.hasDisliked,
                likes: movie.hasLiked ? movie.likes - 1 : movie.likes,
                hasLiked: false,
              }
            : movie
        ),
      };
    case "SET_SELECTED_CATEGORIES":
      return { ...state, selectedCategories: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_MOVIES_PER_PAGE":
      return { ...state, moviesPerPage: action.payload, currentPage: 1 };
    default:
      return state;
  }
};

export const setMovies = (movies) => ({
  type: "SET_MOVIES",
  payload: movies,
});

export const setLoading = () => ({
  type: "SET_LOADING",
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

export const removeMovie = (id) => ({
  type: "REMOVE_MOVIE",
  payload: id,
});

export const toggleLike = (id) => ({
  type: "TOGGLE_LIKE",
  payload: id,
});

export const toggleDislike = (id) => ({
  type: "TOGGLE_DISLIKE",
  payload: id,
});

export const setSelectedCategories = (categories) => ({
  type: "SET_SELECTED_CATEGORIES",
  payload: categories,
});

export const setCurrentPage = (page) => ({
  type: "SET_CURRENT_PAGE",
  payload: page,
});

export const setMoviesPerPage = (number) => ({
  type: "SET_MOVIES_PER_PAGE",
  payload: number,
});

export default movieReducer;
