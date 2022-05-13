import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector from "../forms/MultipleSelector";
import { GenreDTO } from "../genres/genres.model";
import { useState } from "react";
import { movieTheatreDTO } from "../movietheatres/movieTheatre.model.d";

export default function MovieForm(props: movieFormProps) {
    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));
    const [selectedMovieTheatres, setSelectedMovieTheatres] = useState(mapToModel(props.selectedMovieTheatres));
    const [nonSelectedMovieTheatres, setNonSelectedMovieTheatres] = useState(mapToModel(props.nonSelectedMovieTheatres));

    function mapToModel(items: {id: number, name: string}[]) {
        return items.map( item => ({ key: item.id, value: item.name}) )
    }

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) => {
                //get the IDs of the genres selected into our Formik form values so that they can also get submitted
                values.genresIds = selectedGenres.map( item => item.key) 
                values.movieTheatresIds = selectedMovieTheatres.map( item => item.key) 
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
                    <MultipleSelector displayName="Genres" 
                        nonSelected={ nonSelectedGenres } selected={selectedGenres}
                        
                        onChange={ (selected, nonSelected) => {
                            setSelectedGenres(selected);;
                            setNonSelectedGenres(nonSelected);
                        }}
                    />
                    <MultipleSelector displayName="Movie Theatres" 
                        nonSelected={ nonSelectedMovieTheatres } selected={selectedMovieTheatres}
                        
                        onChange={ (selected, nonSelected) => {
                            setSelectedMovieTheatres(selected);
                            setNonSelectedMovieTheatres(nonSelected);;
                        }}
                    />
                    <Button disabled={formikProps.isSubmitting} type='submit'>Create</Button>
                    <Link to='/genres' className="btn btn-secondary btn-sm">Cancel</Link>
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
}