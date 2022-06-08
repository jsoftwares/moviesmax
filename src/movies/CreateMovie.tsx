import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlMovies } from "../endpoints";
import { GenreDTO } from "../genres/genres.model";
import { movieTheatreDTO } from "../movietheatres/movieTheatre.model.d";
import DisplayErrors from "../utils/DisplayErrors";
import { convertMovieToFormData } from "../utils/formDataUtils";
import Loading from "../utils/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviesPostGetDTO } from "./movies.model";

export default function CreateMovie(){
    const [nonSelectedGenres, setNonSelectedGenres] = useState<GenreDTO[]>([]);
    const [nonSelectedMovieTheatres, setNonSelectedMovieTheatres] = useState<movieTheatreDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`${urlMovies}/PostGet`)
        .then( (response: AxiosResponse<moviesPostGetDTO>) => {
            setNonSelectedGenres(response.data.genres);
            setNonSelectedMovieTheatres(response.data.movieTheatres);
            setLoading(false);
        })
    }, []);

   async function create(movie:movieCreationDTO) {
       try {
           const formData = convertMovieToFormData(movie);
           const response = await axios({
               method: 'post',
               url: urlMovies,
               data: formData,
               headers: {'Content-Type': 'multipart/form-data'}
           });

            // Redirect user to route where we display details of just created movie; API will return d movie ID
           navigate(`/movies/${response.data}`);
       } catch (error: any) {
        setErrors(error.response.data);
       }
   }

    return (
        <>
            <h3>New Movie</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading /> :
                <MovieForm 
                    model={ {title: '', inTheatres: false, trailer: ''} } 
                    onSubmit={ async values => {console.log(values);
                     await create(values)} } 
                    selectedGenres={[]}
                    nonSelectedGenres={nonSelectedGenres}
                    selectedMovieTheatres={[]}
                    nonSelectedMovieTheatres={nonSelectedMovieTheatres}
                    selectedActors={[]}
                />
            }
        </>
    );
}