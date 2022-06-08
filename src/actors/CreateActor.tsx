import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlActors } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import {convertActorToFormData} from "../utils/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO } from "./actors.model";


export default function CreateActor(){
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();
    async function create(actor: actorCreationDTO) {
        try {
            const formData = convertActorToFormData(actor);
            await axios({
                method: 'post',
                url: urlActors,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data'}
            });
            navigate('/actors');
        } catch (error:any) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }
    return (
        <>
            <h3>New Actor</h3>
            <DisplayErrors errors={errors} />
            {/* we pass dateOfBirth as undefined so that Formik takes into account that dateOfBirth property exists */}
            <ActorForm model={ {name: '', dateOfBirth: undefined} } 
                onSubmit={ async values=> await create(values)  } />
        </>
    );
}