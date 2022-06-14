import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Authorize from "../auth/Authorize";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import { landingPageDTO } from "./movies.model";
import MoviesList from "./MoviesList";

export default function LandingPage() {
    const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect( () => {
    loadData();
  }, []);
  
  const loadData = () => axios.get(urlMovies)
  .then((response: AxiosResponse<landingPageDTO>) => {
    setMovies(response.data);
  });

    return (
        <AlertContext.Provider value={()=> loadData() }>
            <Authorize authorized={<>You're authorized</>} notAuthorized={<>You're NOT authorized</>} role='admin' />
            
            <h3>In Theatres</h3>
            <MoviesList movies={movies.inTheatres} />

            <h3>Upcoming Releases</h3>
            <MoviesList movies={movies.upcomingReleases} />
        </AlertContext.Provider>
    );
}