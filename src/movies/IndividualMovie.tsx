import { movieDTO } from "./movies.model";
import css from './IndividualMovie.module.css';
import { Link } from "react-router-dom";
import customConfirm from "../utils/CustomConfirm";
import Button from "../utils/Button";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";

export default function IndividualMovie(props: movieDTO) {
    const buildLink = () => `/movies/${props.id}`;
    const customAlert = useContext(AlertContext);
    function deleteMovie() {
        axios.delete(`${urlMovies}/${props.id}`)
        .then(() => {
            /**When we delete a movie, we need to let d LandingPage component know that it needs to go to  
             * our API to retreive d latest movies to display. 1 way to do that is to use a Context(with this,
             * we can establist a communication channel btw components no matter where they are in d component
             * hierarchy). And in our LandingPage we'd now need to use a Provider from where we will pass d 
             * function we are invoking here.
             */
            customAlert();
        });
    }
    return (
        <div className={css.div}>
            <Link to={buildLink()}>
                <img src={props.poster} alt="Poster" />
            </Link>
            <p>
                <Link to={buildLink()}>{props.title}</Link>
            </p>
            <div>
                <Link className="btn btn-info btn-sm"
                style={{marginRight: '.5rem'}} to={`/movies/edit/${props.id}`}>Edit</Link>
                <Button className="btn btn-danger btn-sm"
                    onClick={() => customConfirm(()=> deleteMovie() )}
                >Delete</Button>
            </div>
        </div>
    );

}