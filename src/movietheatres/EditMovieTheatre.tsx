import MovieTheatreForm from "./MovieTheatreForm";

export default function EditMovieTheatre(){
    return (
        <>
            <h3>Edit Movie Theatre</h3>
            <MovieTheatreForm 
                model={ {name: 'Angora Clarence'} }
                onSubmit={ values => console.log(values) }
            />
        </>
    );
}