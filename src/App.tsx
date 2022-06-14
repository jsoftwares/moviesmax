import './App.css';
import Menu from './Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './route-config';
import configureValidations from './Validations';
import { useState } from 'react';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/AuthenticationContext';

configureValidations();

function App() {

  const [claims, setClaims] = useState<claim[]>([
    {name: 'email', value: 'jeff.ict@gmail.com'}
  ]);

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={ {claims, update: setClaims}}>
        <Menu />
        <div className='container'>
          <Routes>

            {routes.map( route =>
              <Route key={route.path} path={route.path} element={<route.component />} />
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
