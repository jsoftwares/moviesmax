import { Link } from "react-router-dom";

export default function IndexActors() {
    return (
        <>
            <h3>Actors</h3>
            <Link className="btn btn-primary btn-sm" to='/actors/create'>Create Actor</Link>
        </>
    );
}