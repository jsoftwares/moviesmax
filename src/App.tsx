import './App.css';
import Menu from './Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './route-config';
import configureValidations from './Validations';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/AuthenticationContext';
import { getClaims } from './auth/handleJWT';
import configureInterceptor from './utils/httpInterceptors';

configureValidations();
configureInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  // check if 'role' with value of 'admin' is part of the user's claims(info);
  function isAdmin(){
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={ {claims, update: setClaims}}>
        <Menu />
        <div className='container'>
          <Routes>

            {routes.map( route =>
              <Route key={route.path} path={route.path} 
              element={
                route.isAdmin && !isAdmin() ? <>
                <strong>You are not allowed to access this page</strong>
                </> :
              <route.component />} />
            )}

          </Routes>
        </div>
        <footer className='bd-footer py-5 mt-5 bg-light'>
          <div className="container">
            MoviesMax {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
