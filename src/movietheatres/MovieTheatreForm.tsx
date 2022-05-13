import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import Map from "../utils/Map";
import { movieTheatreCreationDTO } from "./movieTheatre.model.d";

export default function movieTheatreForm(props: movieTheatreFormProps) {

    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={ Yup.object({
                name: Yup.string().required('This field is required').firstLetterUppercase()
            })}
        >
            { (formikProps) => (
                <Form>
                    <TextField displayName="Name" field="name" />
                    <div style={ {marginBottom: '1rem'} }>
                        <Map />
                    </div>
                    <Button type='submit' disabled={ formikProps.isSubmitting }>
                        Save Changes
                    </Button>
                    <Link className='btn btn-secondary btn-sm' to='/movietheatres'>Cancel</Link>
                </Form>
            ) }
        </Formik>
    );

}

interface movieTheatreFormProps {
    model: movieTheatreCreationDTO;
    onSubmit(values: movieTheatreCreationDTO, actions: FormikHelpers<movieTheatreCreationDTO>): void;
}