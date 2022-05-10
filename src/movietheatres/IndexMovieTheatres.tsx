import { Link } from "react-router-dom";

export default function IndexMovieTheatres() {
    return (
        <>
            <h3>Movie Theatres</h3>
            <Link className="btn btn-primary btn-sm" to='/movietheatres/create'>Create Movie Theatre</Link>
        </>
    );
}