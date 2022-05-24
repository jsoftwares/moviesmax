import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlGenres } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import GenreForm from "./GenreForm";
import { GenreCreationDTO } from "./genres.model";

export default function CreateGenre(){
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    async function create(genre: GenreCreationDTO) {
        try {
            await axios.post(urlGenres, genre);
            navigate('/genres');
        } catch (error:any) {
            if (error && error.response) {
                setErrors(error.response.data);
            } 
        }
    }

    return (
        <>
            <h3>New Genre</h3>
            <DisplayErrors errors={errors} />
            <GenreForm 
                model={{name: ''}} 
                onSubmit= { async value => {                
                    await create(value);                    
                } } 
            />
        </>
    );
}