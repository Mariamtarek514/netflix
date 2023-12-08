import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firbase";
import MovieItem from "./../../ui/MovieItem";
const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user]);
  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };
  return (
    <>
      <div>
        <div>
          <img
            className="objec-cover block h-[300px] w-full sm:h-[500px]"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/6deb5ef0-79a9-44d4-97b6-934a7b64c1e3/EG-en-20231127-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="netflix background"
          />
          <div className=" fixed left-0 top-0 h-[300px] w-full bg-black/60 sm:h-[500px]"></div>
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="my-2 font-nsans-bold text-3xl md:text-5xl">
              My Shows
            </h1>
            <p className="font-nsans-light text-lg text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        {/* show favorite movies */}
        <div className="mb-10">
          <h2 className="p-4 font-nsans-bold capitalize md:text-xl">
            {movies.length > 0
              ? "favorite Shows"
              : "Add shows to your favorite"}
          </h2>
          <div className="group relative flex items-center">
            <MdChevronLeft
              onClick={() => slide(-500)}
              size={40}
              className="absolute left-2 z-10 hidden cursor-pointer rounded-full bg-white text-gray-700 opacity-80 group-hover:block"
            />
            <div
              id="slider"
              className="h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide "
            >
              {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} close={true} />
              ))}
            </div>
            <MdChevronRight
              onClick={() => slide(500)}
              size={40}
              className="absolute right-2 z-10 hidden cursor-pointer rounded-full bg-white text-gray-700 opacity-80 group-hover:block"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
