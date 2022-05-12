import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

export default function ImageField(props: imageFieldProps){
    const [base64Image, setBase64Image] = useState('');
    const [imageURL, setImageURL] = useState(props.imageURL);
    const { values } = useFormikContext<any>();

    const divStyle = { marginTop: '10px'};
    const imgStyle = { width: '450px'};

    const handleOnchange = ( eventAgs: ChangeEvent<HTMLInputElement> ) => {
        if (eventAgs.currentTarget.files) {
            const file = eventAgs.currentTarget.files[0];
            if (file) {
                toBase64(file)
                .then( base64Representation => setBase64Image(base64Representation))
                .catch( error => console.error(error) );
                //we use VALUES from useFormikContext so that we're able to access what d user selected as file from our parent component
                values[props.field] = file;

                //if d user selects an image from their PC we set imageURL to '' so that we do not have 2 image previews
                setImageURL('');
            }
            else
            {
                //if user presses cancel.
                setBase64Image('');
            }
        }
    }

    // Helper function
    const toBase64 = (file: File) => {
        return new Promise<string>( (resolve, rejects) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve( reader.result as string);
            reader.onerror = (error) => rejects(error);
        })
    }

    return (
        <div className="mb-3">
            <label>{props.displayName}</label>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnchange} className='form-control' />
            {base64Image ? 
            <div>
                <div style={divStyle}>
                    <img src={base64Image} style={imgStyle} alt="Actor" />
                </div>
            </div> : null}
            {imageURL ? 
            <div>
                <div style={divStyle}>
                    <img src={imageURL} style={imgStyle} alt="Actor" />
                </div>
            </div> : null}
        </div>
    );
}

interface imageFieldProps{
    displayName: string;
    imageURL: string;
    field: string;
}

ImageField.defaultProps = {
    imageURL: ''
}