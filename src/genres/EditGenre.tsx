import { urlGenres } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import GenreForm from "./GenreForm";
import { GenreCreationDTO, GenreDTO } from "./genres.model";

export default function EditGenres(){

    return (
        <EditEntity<GenreCreationDTO, GenreDTO>
            url={urlGenres} entityName="Genres" indexURL="/genres"
        >
            {(entity, edit) => 
                <GenreForm 
                model={entity} 
                onSubmit= { async value => {
                    await edit(value);
                } } 
            />
            }
        </EditEntity>
    );
}