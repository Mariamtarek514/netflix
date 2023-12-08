import axios from "axios";
import { useEffect, useState } from "react";
import endpoint, { createImageUrl } from "../services/MovieServices";

const Hero = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const response = await axios.get(endpoint.popular, {
          signal: controller.signal,
        });
        const Movies = response.data.results;
        const randomeMovie = Movies[Math.floor(Math.random() * Movies.length)];
        setMovie(randomeMovie);
      } catch (err) {
        console.log("Fetch Error", err.message);
      }
    }

    fetchData();
    return () => {
      controller.abort();
    };
  }, []);
  const trancate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };
  if (!movie)
    return (
      <>
        <p>Fetching movie...</p>
      </>
    );
  const { title, backdrop_path, release_date, overview } = movie;
  return (
    <div className="h-[550px] w-full  lg:h-[600px]  ">
      <div className="h-full w-full">
        <div className="absolute  h-[550px] w-full lg:h-[600px] ">
          <img
            className="h-full w-full object-cover object-top brightness-[45%]"
            src={createImageUrl(backdrop_path, "original")}
            alt={title}
          />
          <div className="absolute bottom-[10%] w-full p-4 md:p-8 ">
            <h1 className="font-nsans-bold text-2xl md:max-w-[70%] md:text-3xl lg:max-w-[50%] xl:max-w-[35%] ">
              {title}
            </h1>
            <div className="mb-4 mt-4 space-x-3">
              <button className="rounded-sm border bg-gray-300 px-5 py-2 capitalize text-black">
                play
              </button>
              <button className="rounded-sm border border-gray-300 px-5 py-2 capitalize">
                watch later
              </button>
            </div>
            <p className="text-sm text-gray-300"> {release_date}</p>
            <p className="w-full text-gray-200 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
              {trancate(overview, 165)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
