import React from 'react'

//as default, we pass it an function bcos with this AlertContext we want to invoke a function in d LandingPage component
const AlertContext = React.createContext(() => {});
export default AlertContext;