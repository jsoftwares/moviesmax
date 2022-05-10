import { useEffect, useState } from "react";
import { landingPageDTO } from "./movies.model";
import MoviesList from "./MoviesList";

export default function LandingPage() {
    const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect( () => {
    const timerId = setTimeout(() => {
      setMovies({
        inTheaters: [
          {
            id: 1,
            title: 'Spider-Man: Far From Home',
            poster: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg'
          },
          {
            id: 2,
            title: 'Luca',
            poster: 'https://m.media-amazon.com/images/I/51+47cIsY6L._AC_SY679_.jpg'
          },
        ],
        upcomingReleases: [
          {id: 3, title: 'Soul', poster: 'https://movieposters2.com/images/1736297-b.jpg'}
        ]
      });
    }, 1000);

    return () => clearTimeout(timerId);
  })
    return (
        <>
            <h3>In Theatre</h3>
            <MoviesList movies={movies.inTheaters} />

            <h3>Upcoming Releases</h3>
            <MoviesList movies={movies.upcomingReleases} />
        </>
    );
}