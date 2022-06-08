import { actorMovieDTO } from "../actors/actors.model";
import { GenreDTO } from "../genres/genres.model";
import { movieTheatreDTO } from "../movietheatres/movieTheatre.model.d";
import MovieForm from "./MovieForm";

export default function EditMovie(){
    const selectedGenres: GenreDTO[] = [{id: 1, name: 'Comdey'}];
    const nonSelectedGenres: GenreDTO[] = [{id: 2, name: 'Drama'}]
    const selectedMovieTheatres: movieTheatreDTO[] = [{id: 1, name: 'iMax'}];
    const nonSelectedMovieTheatres: movieTheatreDTO[] = [{id: 2, name: 'Geneis'}, {id: 3, name: 'Silverbird'}]
    const selectedActors: actorMovieDTO[] = [
        {id: 1, name: 'Tom Holland', character: 'Gerald', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg'}
    ]
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
                selectedGenres={selectedGenres}
                nonSelectedGenres = {nonSelectedGenres}
                selectedMovieTheatres={selectedMovieTheatres}
                nonSelectedMovieTheatres = {nonSelectedMovieTheatres}
                selectedActors={selectedActors}
            />
        </>
    );
}