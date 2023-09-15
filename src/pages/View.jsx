import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters, AiOutlineHome } from "react-icons/ai";
import { BiCameraMovie } from 'react-icons/bi'
import { PiMonitorPlay, PiNewspaperLight } from "react-icons/pi";
import { IoLogOutOutline } from 'react-icons/io5'
function View() {
  let { id } = useParams();

  const [movie, setMovie] = useState(null); // Initialize movie state as null
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [error, setError] = useState(null); // Initialize error state as null

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWYzZTEyYTk5NjJkZWYzYzc4YzJjMjlmMWI5MThlYSIsInN1YiI6IjY1MDEzOTZmNmEyMjI3MDExYTdiMTFmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cso8ziY--epv8wVEQhpLnnCUmCEes9FMMWl4wxfto4E",

      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}`, options) // Use the correct API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setMovie(response); // Update movie state
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        console.error(err);
        setError(err); // Set error state
        setLoading(false); // Set loading to false
      });
  }, [id]);

  console.log(movie)
  return (
    <div className="container mx-0">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center">Error: {error.message}</p>
      ) : (
        <div className="h-full w-full">
          <section className="flex h-full">
            <div className="grid justify-evenly h-screen w-48 py-16 border-r rounded-3xl">
              <span className="flex items-start font-bold text-xl p-3">
                MovieApp
              </span>
              <div className="grid items-center gap-5">
                <Link className="flex items-center gap-3 p-3 hover:bg-red-200 hover:border-r-4 border-red-800" to="/">
                  <AiOutlineHome />
                  <span>Home</span>
                </Link>
                <Link
                  className="flex items-center gap-3 p-3 bg-red-200 border-r-4 border-red-800"
                >
                  <BiCameraMovie />
                  <span className="text-red-800">Movies</span>
                </Link>
                <Link className="flex items-center gap-3 p-3 hover:bg-red-200 hover:border-r-4 border-red-800" to="/">
                  <PiMonitorPlay />
                  <span>TV Series</span>
                </Link>
                <Link className="flex items-center gap-3 p-3 hover:bg-red-200 hover:border-r-4 border-red-800" to="/">
                  <PiNewspaperLight />
                  <span>Upcoming</span>
                </Link>
              </div>
              <div className="grid items-end gap-3 m-2">
                <div className="grid gap-3 border border-red-500 p-3 rounded-md">
                  <span className="font-bold">
                    Play movie quiz and win free ticket
                  </span>
                  <span className="text-sm">50k people are playing now</span>
                  <button className="bg-red-200 text-red-700 text-sm py-1.5 px-4 rounded-full">
                    Start playing
                  </button>
                </div>
                <Link className="flex items-center gap-3 p-3 hover:bg-red-200 hover:border-r-4 border-red-800" to="/">
                  <IoLogOutOutline />
                  <span>Log out</span>
                </Link>
              </div>
            </div>
            <div className="p-16 w-full">
              <div className="h-full w-full relative">
                <img
                  src={`http://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                  alt="alt"
                  className="w-full object-contain rounded-lg"
                />
              </div>
              <div>
                <span>{movie.title}</span>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default View;
