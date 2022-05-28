import { urlMovieTheatres } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { movieTheatreCreationDTO, movieTheatreDTO } from "./movieTheatre.model.d";
import MovieTheatreForm from "./MovieTheatreForm";

export default function EditMovieTheatre(){
    return (
        <EditEntity<movieTheatreCreationDTO, movieTheatreDTO>
            url={urlMovieTheatres} indexURL='/movietheatres' entityName='Movie Theatre'
        >
            { (entity, edit) => 
                <MovieTheatreForm model={entity} 
                    onSubmit={ async values => await edit(values)}
                />
            }
        </EditEntity>
    );
}