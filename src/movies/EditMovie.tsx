import MovieForm from "./MovieForm";

export default function EditMovie(){
    return (
        <>
            <h3>Edit Movie</h3>
            <MovieForm 
                model={ {
                    title: 'Toy Story',
                    inTheatres: true,
                    trailer: 'https://youtube.com',
                    releaseDate: new Date('2020-01-01T00:00:00')
                }} 
                onSubmit={ values => console.log(values) } 
            />
        </>
    );
}