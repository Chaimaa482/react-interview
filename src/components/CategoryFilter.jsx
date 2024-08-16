import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategories } from "../redux/moviesReducer";

const CategoryFilter = () => {
  const categories = useSelector((state) => state.categories);
  const selectedCategories = useSelector((state) => state.selectedCategories);
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    dispatch(setSelectedCategories(newSelectedCategories));
  };

  return (
    <div className="category-filter">
      <p>Filter by category your movies : </p>
      {categories.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
