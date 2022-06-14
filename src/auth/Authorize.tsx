import React, { ReactElement, useContext, useEffect, useState } from 'react'
import AuthenticationContext from './AuthenticationContext';

export default function Authorize(props: authorizeProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const {claims} = useContext(AuthenticationContext);

    useEffect(() => {
        /**if d role props was passed, we check d array of d user claims(info) if there is any with name of
         * role & value of role passed as props. filter() returns -1 if there is no match & d index of d element
         * if there's a match in d array; this index will be a number GT -1, hence we evaluate if it's GT -1
         * & use d boolean returned to set our isAuthorized state.
         * Otherwise we check if the user has any claims in d claims array, if they do then for our application
         * such user is authorized to our app, so we evaluate this & use result to set isAuthrized.
         * props.role is actually not going to change but we just added it as dependency to remove the yellow
         * line alert
         */
        if (props.role) {
            const index = claims.findIndex(claim => claim.name === 'role' && claim.value === props.role);
            setIsAuthorized( index > -1 );
        }else {
            setIsAuthorized(claims.length > 0);
        }
    }, [claims, props.role])

  return (
    <>
        {isAuthorized ? props.authorized : props.notAuthorized}
    </>
  )
}

interface authorizeProps{
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    role?: string
}
