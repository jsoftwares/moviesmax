import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorize from "./auth/Authorize";
import { logout } from "./auth/handleJWT";
import Button from "./utils/Button";

export default function Menu() {

    const {claims, update} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    function getUserEmail(): string {
        return claims.filter(x => x.name === 'email')[0]?.value; //filter will return new array of claim object
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className="container-fluid">
                <NavLink to="/" className="nav-brand">MoviesMax</NavLink>

                <div className="collapse navbar-collapse" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/movies/filter" className="nav-link">Filter Movies</NavLink>
                        </li>
                        <Authorize 
                            role='admin'
                            authorized={
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/genres" className="nav-link">Genres</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/actors" className="nav-link">Actors</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/movietheatres" className="nav-link">Movie Theatres</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/movies/create" className="nav-link">Create a Movie</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/users" className="nav-link">Users</NavLink>
                                    </li>
                                </>
                            }
                        />
                    </ul>
                </div>

                <div className="d-flex">
                    <Authorize 
                        authorized={<>
                            <span className='nav-link'>Hello, {getUserEmail()}</span>
                            <Button className='nav-link btn btn-link' onClick={() => {
                                logout();
                                update([]);
                                navigate('/login')
                            }}>Logout</Button>
                        </>}
                        notAuthorized={
                            <>
                                <Link to='/register' className='nav-link btn btn-link'>Register</Link>
                                <Link to='/login' className='nav-link btn btn-link'>Login</Link>
                            </>
                        }
                    />
                </div>
            </div>
        </nav>
    );
}