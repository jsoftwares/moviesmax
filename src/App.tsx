import './App.css';
import Menu from './Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './route-config';
import configureValidations from './Validations';

configureValidations();

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <div className='container'>
        <Routes>

          {routes.map( route =>
            <Route key={route.path} path={route.path} element={<route.component />} />
          )}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
