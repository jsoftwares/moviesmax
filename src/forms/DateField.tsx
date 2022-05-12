import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps) {
    const {values, validateForm, touched, errors} = useFormikContext<any>();
    return (
        <div className="mb-3">
            <label htmlFor={props.field}>{props.displayName}</label>
            <input type="date" className="form-control"
                id={props.field} name={props.field} 
                //here we need to access d current value of this field(REM: in Edit mode, there will already be a value for DoB field)
                //oneway to access this value is using a Context. Formik already comes with a context that allows us access several
                //of the values of Formik - one of them is VALUES(with this we've access to d values in initialValues of ActorForm)
                defaultValue={values[props.field]?.toLocaleDateString('en-CA')}
                onChange={ e => {
                    const date = new Date(e.currentTarget.value + 'T00:00:00');
                    values[props.field] = date;
                    validateForm();
                }} 
            />

            {touched[props.field] && errors[props.field] ? 
            <div className="text-danger">{ errors[props.field]?.toString() }</div> : null }
        </div>
    );
}

interface dateFieldProps{
    field: string;
    displayName: string;
}