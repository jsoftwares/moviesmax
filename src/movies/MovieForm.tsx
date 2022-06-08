import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import { GenreDTO } from "../genres/genres.model";
import { useState } from "react";
import { movieTheatreDTO } from "../movietheatres/movieTheatre.model.d";
import TypeAheadActors from "../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.model";
import MarkdownField from "../actors/MarkdownField";

export default function MovieForm(props: movieFormProps) {
    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));
    const [selectedMovieTheatres, setSelectedMovieTheatres] = useState(mapToModel(props.selectedMovieTheatres));
    const [nonSelectedMovieTheatres, setNonSelectedMovieTheatres] = useState(mapToModel(props.nonSelectedMovieTheatres));

    const [selectedActors, setSelectedActors] = useState(props.selectedActors);

    function mapToModel(items: {id: number, name: string}[]): multipleSelectorModel[] {
        return items.map( item => {
            return { key: item.id, value: item.name}
        })
    }

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) => {
                //get the IDs of the genres selected into our Formik form values so that they can also get submitted
                values.genresIds = selectedGenres.map( item => item.key) 
                values.movieTheatresIds = selectedMovieTheatres.map( item => item.key) 
                values.actors = selectedActors
                props.onSubmit(values, actions)
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('This field is required').firstLetterUppercase(),
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField field="title" displayName="Title" />
                    <CheckboxField displayName="In Theatres" field="inTheatres" />
                    <TextField field="trailer" displayName="Trailer" />
                    <DateField displayName="Release Date" field="releaseDate" />
                    <ImageField displayName="Poster" field="poster" imageURL={props.model.posterURL} />
                    <MarkdownField displayName="Summary" field="summary" />
                    <MultipleSelector displayName="Genres" 
                        nonSelected={ nonSelectedGenres } selected={selectedGenres}
                        
                        onChange={ (selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }}
                    />
                    <MultipleSelector displayName="Movie Theatres" 
                        nonSelected={ nonSelectedMovieTheatres } selected={selectedMovieTheatres}
                        
                        onChange={ (selected, nonSelected) => {
                            setSelectedMovieTheatres(selected);
                            setNonSelectedMovieTheatres(nonSelected);
                        }}
                    />
                    <TypeAheadActors displayName="Actors" actors={selectedActors} 
                        onAdd={ actors=> {
                            setSelectedActors(actors);
                        }}

                        onRemove={ actor => {
                            const actors = selectedActors.filter( x => x !== actor);
                            setSelectedActors(actors);
                        }}

                        listUI= { (actor: actorMovieDTO) => 
                            <>
                                {actor.name} / <input type='text' placeholder='Character' 
                                    value={actor.character}
                                    onChange={e=> {
                                        const index = selectedActors.findIndex(x => x.id === actor.id);
                                        
                                        const actors = [...selectedActors];
                                        actors[index].character = e.currentTarget.value;
                                        setSelectedActors(actors);
                                    }}
                                />
                            </>
                        
                        }
                    />
                    <Button disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
                    <Link to='/' className="btn btn-secondary btn-sm">Cancel</Link>
                </Form>
            )}
        </Formik>
    );
}

interface movieFormProps{
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void;
    selectedGenres: GenreDTO[];
    nonSelectedGenres: GenreDTO[];
    selectedMovieTheatres: movieTheatreDTO[];
    nonSelectedMovieTheatres: movieTheatreDTO[];
    selectedActors: actorMovieDTO[];
}