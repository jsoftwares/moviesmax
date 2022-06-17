import { urlActors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.model";

export default function IndexActors() {
    return (
        <>
            <IndexEntity<actorDTO>
                url={urlActors} title='Actors' entityName='Actor' 
                createURL='/actors/create'
            >
                { (actors, buttons) => <>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { actors?.map((actor => <tr key={actor.id}>
                            <td>{actor.name}</td>
                            <td>{buttons(`/actors/edit/${actor.id}`, actor.id)}</td>
                        </tr>))}
                    </tbody>
                </>}
            </IndexEntity>
        </>
    );
}