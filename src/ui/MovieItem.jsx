import { useState } from "react";
import { createImageUrl } from "../services/MovieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../services/firbase";
import { useAuth } from "../context/AuthContext";
const MovieItem = ({ movie, close = false }) => {
  const [like, setLike] = useState(false);
  const { user } = useAuth();
  const { title, backdrop_path, poster_path } = movie;

  async function toggleFavShows() {
    const userEamil = user?.email;
    if (userEamil) {
      const userDoc = doc(db, "users", userEamil);
      setLike(!like);
      await updateDoc(userDoc, { favShows: arrayUnion({ ...movie }) });
    } else {
      alert("Login to Save a movie...");
    }
  }
  async function handleUnlikeShow(movie) {
    const userDoc = doc(db, "users", user.email);
    await updateDoc(userDoc, { favShows: arrayRemove(movie) });
  }
  return (
    <div className="relative m-2 inline-block w-[160px] cursor-pointer overflow-hidden rounded-lg sm:w-[200px] md:w-[240px] lg:w-[280px] ">
      <img
        className="block h-40 w-full object-cover object-top"
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="absolute left-0 top-0 h-40 w-full bg-black/80 opacity-0 transition-all duration-300 hover:opacity-100">
        <p className="flex h-full items-center justify-center whitespace-normal  font-nsans-bold text-xs md:text-sm">
          {title}
        </p>
        {close && (
          <p>
            <AiOutlineClose
              onClick={() => handleUnlikeShow(movie)}
              size={25}
              className="absolute right-2 top-2 "
            />
          </p>
        )}
        {!close && (
          <p onClick={toggleFavShows} className="cursor-pointer">
            {like ? (
              <FaHeart
                size={20}
                className="absolute left-2 top-2 text-gray-300"
              />
            ) : (
              <FaRegHeart
                size={20}
                className="absolute left-2 top-2 text-gray-300"
              />
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieItem;
