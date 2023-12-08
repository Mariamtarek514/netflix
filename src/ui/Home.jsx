import endpoint from "../services/MovieServices";
import Hero from "./Hero";
import MovieRow from "./MovieRow";

const Home = () => {
  return (
    <>
      <Hero />
      <MovieRow title="upcoming" url={endpoint.upcoming} />
      <MovieRow title="trending" url={endpoint.trending} />
      <MovieRow title="top rated" url={endpoint.topRated} />
      <MovieRow title="comedy" url={endpoint.comedy} />
      <MovieRow title="popular" url={endpoint.popular} />
    </>
  );
};

export default Home;
