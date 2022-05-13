import { GenreDTO } from "../genres/genres.model";
import { movieTheatreDTO } from "../movietheatres/movieTheatre.model.d";
import MovieForm from "./MovieForm";

export default function CreateMovie(){
    const nonSelectedGenres: GenreDTO[] = [{id: 1, name: 'Comdey'}, {id: 2, name: 'Drama'}];
    const nonSelectedMovieTheatres: movieTheatreDTO[] = [{id: 1, name: 'iMax'}, {id: 2, name: 'Genesis'}, {id: 3, name: 'Silverbird'}];
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
                selectedGenres={[]}
                nonSelectedGenres={nonSelectedGenres}
                selectedMovieTheatres={[]}
                nonSelectedMovieTheatres={nonSelectedMovieTheatres}
            />
        </>
    );
}