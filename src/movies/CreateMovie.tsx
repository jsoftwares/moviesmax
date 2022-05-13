import MovieForm from "./MovieForm";

export default function CreateMovie(){
    return (
        <>
            <h3>New Movie</h3>
            <MovieForm 
                model={ {
                    title: '',
                    inTheatres: false,
                    trailer: ''
                }} 
                onSubmit={ values => console.log(values) } 
            />
        </>
    );
}