import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setMoviesPerPage } from "../redux/moviesReducer";

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const moviesPerPage = useSelector((state) => state.moviesPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleMoviesPerPageChange = (event) => {
    dispatch(setMoviesPerPage(parseInt(event.target.value)));
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
      <select value={moviesPerPage} onChange={handleMoviesPerPageChange}>
        <option value={4}>4 per page</option>
        <option value={8}>8 per page</option>
        <option value={12}>12 per page</option>
      </select>
    </div>
  );
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
  };

export default Pagination;
