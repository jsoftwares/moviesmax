import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies } from "../endpoints";
import { GenreDTO } from "../genres/genres.model";
import { movieTheatreDTO } from "../movietheatres/movieTheatre.model.d";
import Loading from "../utils/Loading";
import MovieForm from "./MovieForm";
import { moviesPostGetDTO } from "./movies.model";

export default function CreateMovie(){
    const [nonSelectedGenres, setNonSelectedGenres] = useState<GenreDTO[]>([]);
    const [nonSelectedMovieTheatres, setNonSelectedMovieTheatres] = useState<movieTheatreDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        axios.get(`${urlMovies}/PostGet`)
        .then( (response: AxiosResponse<moviesPostGetDTO>) => {
            setNonSelectedGenres(response.data.genres);
            setNonSelectedMovieTheatres(response.data.movieTheatres);
            setLoading(false);
        })
    }, [])
    return (
        <>
            <h3>New Movie</h3>
            {loading ? <Loading /> :
                <MovieForm 
                    model={ {
                        title: '',
                        inTheatres: false,
                        trailer: ''
                    }} 
                    onSubmit={ values => console.log(values) } 
                    selectedGenres={[]}
                    nonSelectedGenres={nonSelectedGenres}
                    selectedMovieTheatres={[]}
                    nonSelectedMovieTheatres={nonSelectedMovieTheatres}
                    selectActors={[]}
                />
            }
        </>
    );
}