import { actorMovieDTO } from "../actors/actors.model";
import { GenreDTO } from "../genres/genres.model";
import { movieTheatreDTO } from "../movietheatres/movieTheatre.model.d";

export interface movieDTO {
    id: number;
    title: string;
    poster: string;
    inTheatres: boolean;
    trailer: string;
    summary?: string;
    releaseDate: Date;
    genres: GenreDTO[];
    movieTheatres: movieTheatreDTO[];
    actors?: actorMovieDTO[];
}

export interface movieCreationDTO {
    title: string;
    inTheatres: boolean;
    trailer: string;
    summary?: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
    movieTheatresIds?: number[];
    actors?: actorMovieDTO[];
}

export interface landingPageDTO {
    inTheaters?: movieDTO[];
    upcomingReleases?: movieDTO[];
}

export interface moviePostGetDTO{
    genres: GenreDTO[];
    movieTheatres: movieTheatreDTO[];
}

export interface moviePutGetDTO{
    movie: movieDTO;
    selectedGenres: GenreDTO[];
    nonSelectedGenres: GenreDTO[];
    selectedMovieTheatres: movieTheatreDTO[];
    nonSelectedMovieTheatres: movieTheatreDTO[];
    actors: actorMovieDTO[];
}