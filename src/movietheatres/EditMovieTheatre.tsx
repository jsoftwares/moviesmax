import MovieTheatreForm from "./MovieTheatreForm";

export default function EditMovieTheatre(){
    return (
        <>
            <h3>Edit Movie Theatre</h3>
            <MovieTheatreForm 
                model={ {name: 'Angora Clarence', latitude: 6.429583697052934, longitude: 3.4682607648574053} }
                onSubmit={ values => console.log(values) }
            />
        </>
    );
}