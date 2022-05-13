import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";

export default function MovieForm(props: movieFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
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
}