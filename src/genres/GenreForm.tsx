import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import { GenreCreationDTO } from "./genres.model";

export default function GenreForm(props: GenresFormProps) {
    return (
        <Formik initialValues={
            // {name: ''}
            props.model
        } onSubmit={ props.onSubmit }
        validationSchema = { Yup.object(
            {
                name: Yup.string().required('Name field is required')
                .max(50, 'Max length is 50 characters').firstLetterUppercase()
            }
        )} 
        >
            {/* disable submit button when submit form is submitted */}
            { (formikProps) => (
                <Form className="col-8 offset-2">
                    <TextField field="name" displayName="Name" />
                    <Button disabled={formikProps.isSubmitting} type='submit'>Save</Button>
                    <Link to='/genres' className="btn btn-secondary btn-sm">Cancel</Link>
                </Form>
            )}

        </Formik>
    );
}

interface GenresFormProps {
    model: GenreCreationDTO;
    onSubmit(values: GenreCreationDTO, action: FormikHelpers<GenreCreationDTO>): void
}