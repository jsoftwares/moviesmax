import { useParams } from "react-router-dom";
import GenreForm from "./GenreForm";

export default function EditGenres(){
    const {id}: any = useParams();
    return (
        <>
            <h3>Edit Genre</h3>
            <GenreForm 
                model={{name: 'Jeffrey'}} 
                onSubmit= { async value => {
                    await new Promise( r => setTimeout(r, 1000));
                    console.log(id);          
                    console.log(value);          
                } } 
            />
        </>
    );
}