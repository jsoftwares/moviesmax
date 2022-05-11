import GenreForm from "./GenreForm";

export default function CreateGenre(){
    return (
        <>
            <h3>New Genre</h3>
            <GenreForm 
                model={{name: ''}} 
                onSubmit= { async value => {
                    await new Promise( r => setTimeout(r, 1000));
                    console.log(value);            
                } } 
            />
        </>
    );
}