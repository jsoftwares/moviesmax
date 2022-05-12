import { Form, Formik } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { movieTheatreCreationDTO } from "./movieTheatre.model.d";

export default function movieTheatreForm(props: movieTheatreFormProps) {

    return (
        <Formik>
            { (formikProps) => (
                <Form>
                    <TextField displayName="Name" field="name" />
                    <Button>Save Changes</Button>
                </Form>
            ) }
        </Formik>
    );

}

interface movieTheatreFormProps {
    model: movieTheatreCreationDTO;
}