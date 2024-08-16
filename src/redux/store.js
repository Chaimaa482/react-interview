import { createStore } from "redux";
import movieReducer from "./moviesReducer";

const store = createStore(movieReducer);

export default store;
