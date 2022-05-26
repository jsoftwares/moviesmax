import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlGenres } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";
import GenreForm from "./GenreForm";
import { GenreCreationDTO } from "./genres.model";

export default function EditGenres(){
    const [genre, setGenre] = useState<GenreCreationDTO>();
    const [errors, setErrors] = useState<string[]>([]);

    const {id}: any = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        const getGenre = async () => {
            const response: AxiosResponse<GenreCreationDTO> = await axios.get(`${urlGenres}/${id}`);
            setGenre(response.data);
        }
        getGenre();
    }, [id])

    async function editGenre(genreToEdit: GenreCreationDTO){
        try {
            await axios.put(`${urlGenres}/${id}`, genreToEdit);
            navigate('/genres');
        } catch (error:any) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }

    return (
        <>
            <h3>Edit Genre</h3>
            <DisplayErrors errors={errors} />
            { genre ? 
                <GenreForm 
                    model={genre} 
                    onSubmit= { async value => {
                        await editGenre(value);
                    } } 
                />
                :
                <Loading />
            }
        </>
    );
}