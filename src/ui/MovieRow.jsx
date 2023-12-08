import axios from "axios";
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const MovieRow = ({ title, url }) => {
  const rowId = Math.floor(Math.random() * 1000);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
        });
        setMovies(response.data.results);
      } catch (err) {
        console.log("Fetch Error", err.message);
      }
    }

    getData();
    return () => {
      controller.abort();
    };
  }, [url]);
  const slide = (offset) => {
    const slider = document.getElementById(`slider ${rowId}`);
    slider.scrollLeft = slider.scrollLeft + offset;
  };
  return (
    <>
      <h2 className="p-4 font-nsans-bold capitalize md:text-xl">{title}</h2>
      <div className="group relative flex items-center">
        <MdChevronLeft
          onClick={() => slide(-500)}
          size={40}
          className="absolute left-2 z-10 hidden cursor-pointer rounded-full bg-white text-gray-700 opacity-80 group-hover:block"
        />
        <div
          id={`slider ${rowId}`}
          className="h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide "
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          size={40}
          className="absolute right-2 z-10 hidden cursor-pointer rounded-full bg-white text-gray-700 opacity-80 group-hover:block"
        />
      </div>
    </>
  );
};

export default MovieRow;
