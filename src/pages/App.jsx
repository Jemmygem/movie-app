import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {
  AiOutlineSearch,
  AiOutlineLoading3Quarters,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";
import { BsInstagram } from 'react-icons/bs'
import { HiBars2 } from 'react-icons/hi2'
import poster from '../assets/poster.png'

function App() {

  const [movies, setMovies] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: 
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWYzZTEyYTk5NjJkZWYzYzc4YzJjMjlmMWI5MThlYSIsInN1YiI6IjY1MDEzOTZmNmEyMjI3MDExYTdiMTFmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cso8ziY--epv8wVEQhpLnnCUmCEes9FMMWl4wxfto4E",
      },
    };

    fetch("https://api.themoviedb.org/3/movie/top_rated", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setMovies(response.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Set an error state and display an error message to the user
      });
  }, [setMovies]);

  
  console.log(movies)

  return (
    <div>
      {/* Header Section */}
      <section
        className="bg-purple-500"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className="container mx-auto py-5 px-5 xl:px-16">
          {/* Navbar Section */}
          <nav className="flex justify-between items-center w-full">
            <span className="text-white font-bold text-xl">MovieApp</span>
            <div className="hidden xl:flex item-center gap-3 text-white w-96 border border-white py-2 px-5 rounded-md">
              <input
                className="flex items-center bg-transparent outline-none w-full placeholder:text-white"
                placeholder="What do you want to watch?"
              />
              <button>
                <AiOutlineSearch className="flex items-center h-7 w-7" />
              </button>
            </div>
            <div className="flex items-center gap-3 font-semibold text-white">
              <a href="">Sign in</a>
              <button className="bg-red-600 text-white p-2 rounded-full">
                <HiBars2 className="h-5 w-5" />
              </button>
            </div>
          </nav>
          {/* End of Navbar Section */}

          {/* Poster Section */}
          <div className="flex justify-between items-center py-20 w-fulld">
            <div className="grid gap-3 text-white w-96">
              <span className="text-5xl">John Wick 3 : Parabellum</span>
              <div></div>
              <span className="w-80">
                John Wick is on the run after killing a member of the
                international assassins guild, and with a $14 million price tag
                on his head, he is the target of hit men and women everywhere.
              </span>
              <div>
                <button className="bg-red-500 py-2 px-5">WATCH TRAILER</button>
              </div>
            </div>
          </div>
          {/* End of Poster Section */}
        </div>
      </section>
      {/* End of Header Section */}

      {/* Featured Movies */}
      <section className="container mx-auto py-16 px-5 xl:px-16">
        <div className="flex justify-between items-center py-16">
          <span className="text-3xl">Featured Movie</span>
          <a className="text-red-600 text-lg" href="">
            See more
          </a>
        </div>
        <div className="grid justify-center items-center w-full">
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <div className="grid md:grid-cols-3 xl:grid-cols-4 justify-between gap-9 w-full">
              {movies.map((movie) => (
                <Link data-testid="movie-card"
                  to={`/view/${movie.id}`}
                  key={movie.id}
                  className="flex flex-col w-full"
                >
                  <div className="h-[490px] w-full">
                    <img data-testid="movie-poster"
                      className="h-full w-full object-contain"
                      src={
                        "https://image.tmdb.org/t/p/w185/" + movie.poster_path
                      }
                      alt="movies"
                    />
                  </div>
                  <div className="grid gap-1 h-16 py-3">
                    <span data-testid="movie-release-date"className="text-xs text-gray-500">USA {movie.release_date}
</span>
                    <span data-testid="movie-title" className="font-bold">{movie.title}</span>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <span className="bg-yellow-500 font-bold text-xs py-1 px-2">
                          IMDb
                        </span>
                        <span> {movie.vote_average *10}/100</span>
                      </div>
                      <span className="font-bold">80%</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Action, Drama, Adventure
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* End f Featured Movies */}

      {/* Footer Section */}
      <section className="text-gray-900">
        <div className="container mx-auto py-5 px-5 xl:px-16">
          <div className="flex justify-center items-center gap-5">
            <AiFillFacebook />
            <BsInstagram />
            <AiOutlineTwitter />
            <AiFillYoutube />
          </div>
          <div className="grid xl:flex justify-center items-center gap-5 font-semibold mb-2">
            <span>Conditions of Use</span>
            <span>privacy Policy</span>
            <span>Press Room</span>
          </div>
          <div className="flex justify-center">
            <span className="text-gray-500">@Movie App By Jameelah</span>
          </div>
        </div>
      </section>
      {/* End of Footer Section */}
    </div>
  );
}

export default App