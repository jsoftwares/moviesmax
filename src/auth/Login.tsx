import { useContext, useState } from 'react'
import axios from 'axios'
import { urlAccounts } from '../endpoints'
import DisplayErrors from '../utils/DisplayErrors'
import { authenticationResponse, userCredentials } from './auth.model'
import AuthForm from './AuthForm'
import { getClaims, saveToken } from './handleJWT'
import AuthenticationContext from './AuthenticationContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function login(credentials: userCredentials){
        try {
            setErrors([]);
            const response = await axios.post<authenticationResponse>(`${urlAccounts}/login`, credentials);
            saveToken(response.data);
            update(getClaims());
            navigate('/');
            
        }
        catch(error: any){
            setErrors(error.response.data)
        }
    }

  return (
    <>
        <h3>Login</h3>
        <DisplayErrors errors={errors} />
        <AuthForm 
            model={{email: '', password: ''}} 
            onSubmit={async values => await login(values)}
        />
    </>
  )
}
