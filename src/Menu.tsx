import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className="container-fluid">
                <NavLink to="/" className="nav-brand">MoviesMax</NavLink>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/genres" className="nav-link">Genres</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/actors" className="nav-link">Actors</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}