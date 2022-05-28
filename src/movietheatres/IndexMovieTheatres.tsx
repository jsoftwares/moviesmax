import { urlMovieTheatres } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { movieTheatreDTO } from "./movieTheatre.model.d";

export default function IndexMovieTheatres() {
    return (
        <IndexEntity<movieTheatreDTO>
            url={urlMovieTheatres} createURL='/movietheatres/create' 
            title='Movie Theatres' entityName='Movie Theatre'
        >
            { (entities, buttons) => <>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {entities?.map( entity => <tr key={entity.id}>
                        <td>{entity.name}</td>
                        <td>{ buttons(`/movietheatres/edit/${entity.id}`, entity.id) }</td>
                    </tr>)
                    }
                </tbody>
            </>}
        </IndexEntity>
    );
}