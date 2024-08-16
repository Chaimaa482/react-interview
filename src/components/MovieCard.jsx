import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleDislike, toggleLike } from "../redux/moviesReducer";
import ConfirmDialog from "./ConfirmDialog";

const MovieCard = ({ id, title, category, likes, dislikes, onDelete }) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) =>
    state.movies.find((movie) => movie.id === id)
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLike = () => {
    dispatch(toggleLike(id));
  };

  const handleDislike = () => {
    dispatch(toggleDislike(id));
  };

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="movie-card">
      <h3>{title}</h3>
      <p>{category}</p>
      <div className="btn-container">
        <button
          onClick={handleLike}
          className={`${movie.hasLiked ? "colored" : ""}`}
        >
          <span className="material-symbols-rounded">thumb_up</span> {likes}
        </button>
        <button
          onClick={handleDislike}
          className={`${movie.hasDisliked ? "colored" : ""}`}
        >
          <span className="material-symbols-rounded">thumb_down</span>{" "}
          {dislikes}
        </button>
        <button onClick={handleDeleteClick} className="btn">
          <span className="material-symbols-rounded">delete</span> delete
        </button>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MovieCard;
