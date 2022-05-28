import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlMovieTheatres } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { movieTheatreCreationDTO } from "./movieTheatre.model.d";
import MovieTheatreForm from "./MovieTheatreForm";

export default function CreateMovieTheatre(){
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const create = async (movieTheatre: movieTheatreCreationDTO) => {
        try {
            await axios.post(urlMovieTheatres, movieTheatre);
            navigate('/movietheatres');
        } catch (error:any) {
            if (error && error.response) {
               setErrors(error); 
            }
        }
    }
    return (
        <>
            <h3>New Movie Theatre</h3>
            <DisplayErrors errors={errors} />
            <MovieTheatreForm 
                model={ {name: ''} }
                onSubmit={ async values => await create(values) }
            />
        </>
    );
}