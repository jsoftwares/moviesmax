import ActorForm from "./ActorForm";


export default function CreateActor(){
    return (
        <>
            <h3>New Actor</h3>
            {/* we pass dateOfBirth as undefined so that Formik takes into account that dateOfBirth property exists */}
            <ActorForm model={ {name: '', dateOfBirth: undefined} } onSubmit={ values=> console.log(values)  } />
        </>
    );
}