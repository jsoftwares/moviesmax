import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from './auth.model';
import * as Yup from 'yup';
import TextField from '../forms/TextField';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';

export default function AuthForm(props: authFormProps) {
  return (
    <Formik
        initialValues={props.model} 
        onSubmit={props.onSubmit} 
        validationSchema={Yup.object({
            email: Yup.string().required('Email is required').email('Enter a valid email'),
            password: Yup.string().required('Password is required')
        })}
    >
        {formikProps => (
            <Form className='col-8 offset-2"'>
                <TextField displayName='Email' field='email' />
                <TextField displayName='Password' field='password' type='password' />
            
                <Button disabled={formikProps.isSubmitting} type='submit'>Send</Button>
                <Link className='btn btn-sm btn-secondary' to='/'>Cancel</Link>
            </Form>
        )}
    </Formik>
  )
}

interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, action: FormikHelpers<userCredentials>): void;
}
