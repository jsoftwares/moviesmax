import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import convertActorToFormData from "../utils/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.model";

export default function EditActor(){
    /**We create & pass a transform function bcos we need to our actorDTO into actorCreatorDTO so that the 
     * DOB is a date and not a string which is what our API returns to us by default
      */
     function transform(actor: actorDTO): actorCreationDTO{
         return {
             name: actor.name,
             pictureURL: actor.picture,
             biography: actor.biography,
             dateOfBirth: new Date(actor.dateOfBirth)
         }
     }
    return (
        <>
            <EditEntity<actorCreationDTO, actorDTO>
                url={urlActors} indexURL='/actors' entityName='Actor' 
                transform={transform} 
                transformToFormData={convertActorToFormData}  
            >
                { (entity, edit) => <ActorForm
                    model={entity}
                    onSubmit={ async values => await edit(values)}
                />}
            </EditEntity>
        </>
    );
}