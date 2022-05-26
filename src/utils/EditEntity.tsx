import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>(props: editEntityProps<TCreation, TRead>){
    /**Since we are going to be working with different Entities that have dfferent data types we are going
     * to use Generics. With Generics, we can pass data types as paramenters.
     * Since from axios we are going to be getting a DTO related to reading, we called this TRead
     * & our entity is TCreation bcos we are going to pass it to the respective forms for our Entities,
     * we will introduce a funcion TRANSFORM() hat would take an entity of TRead and return one of TCreation
     * as response
     * bcos we want to render a react component (a GenreForm for example) we create a function (children)
     * that returs a react element, it takes as parameters ENTITY (we want to pass this to the value for 
     * model props of our react component/Entity form) and EDIT() which we will invoke from the parent
     * component.
     */
    const [entity, setEntity] = useState<TCreation>();
    const [errors, setErrors] = useState<string[]>([]);

    const {id}: any = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        const getEntity = async () => {
            const response: AxiosResponse<TRead> = await axios.get(`${props.url}/${id}`);
            setEntity(props.transform(response.data));
        }
        getEntity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    async function edit(entityToEdit: TCreation){
        try {
            await axios.put(`${props.url}/${id}`, entityToEdit);
            navigate(props.indexURL);
        } catch (error:any) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    }
    return (
        <>
            <h3>Edit {props.entityName}</h3>
            <DisplayErrors errors={errors} />
            { entity ? 
                props.children(entity, edit)
                :
                <Loading />
            }
        </>
    );
}

interface editEntityProps<TCreation, TRead> {
    url: string;
    transform(entity: TRead): TCreation;
    indexURL: string;
    entityName: string;
    children(entity: TCreation, edit: (entity: TCreation) => void ) : ReactElement;
}

/**Default implementation for the transform function bcos most times is it just going to be a simple 
 * transformation of one type to the other without changing any specific values of any property  */
EditEntity.defaultProps = {
    transform: (entity: any) => entity
}