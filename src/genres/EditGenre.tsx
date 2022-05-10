import { useParams } from "react-router-dom";

export default function EditGenres(){
    const {id}: any = useParams();
    return (
        <>
            <h3>Edit Genre</h3>
            <p>The ID is {id}</p>
        </>
    );
}