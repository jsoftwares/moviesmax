import React from "react";
import { claim } from "./auth.model";

/**The update() fn allow us to update the claims through this context: hence if there is a new claim, we can
 *  notify the entire app about that new claim> data inside are adhoc data type we just pass there.
 * We give the context a object default value of empty array for claims & a fn that does nothing for update.
 * Through this context we'd be able to read and also update the claims(info) of the user.
 * We use this context in the App component; our most parents/top-level componment & from App component, we'd
 * distribute the claims of our user to other components */

const AuthenticationContext = React.createContext<{
    claims: claim[];
    update(claims: claim[]): void
}>({ claims: [], update: () => {} });

export default AuthenticationContext;