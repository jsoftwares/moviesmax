import { Field } from "formik";

export default function CheckboxField(props: checkboxField) {
    return (
        <div className="mb-3 check-form">
            <Field className='form-check-input' id={props.field} name={props.field} type='checkbox' />
            <label className="form-check-label" htmlFor={props.field}>&nbsp;{props.displayName}</label>
        </div>
    );
}

interface checkboxField{
    displayName: string;
    field: string;
}