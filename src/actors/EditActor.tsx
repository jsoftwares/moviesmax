import ActorForm from "./ActorForm";

export default function EditActor(){
    return (
        <>
            <h3>Edit Actor</h3>
            <ActorForm model={ 
                {name: 'Tom Holland', 
                    dateOfBirth: new Date('1997-07-02T00:00:00'), 
                    pictureURL: 'https://en.wikipedia.org/wiki/File:Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg' ,
                    biography: `# Tom Holland
Born in the **1990's** is one of the foremost actors in our time.`
                } 
            }
            onSubmit={ values => console.log(values)  }
            />
        </>
    );
}