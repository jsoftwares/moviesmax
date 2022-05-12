import MovieTheatreForm from "./MovieTheatreForm";

export default function CreateMovieTheatre(){
    return (
        <>
            <h3>New Movie Theatre</h3>
            <MovieTheatreForm 
                model={ {name: ''} }
                onSubmit={ values => console.log(values) }
            />
        </>
    );
}