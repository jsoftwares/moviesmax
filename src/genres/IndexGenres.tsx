import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import { GenreDTO } from "./genres.model";
import GenericList from '../utils/GenericList';
import Button from "../utils/Button";

export default function IndexGenres() {
    const [genres, setGenres] = useState<GenreDTO[]>();

    useEffect( () => {
        const getGenres = async() => {
            const genres: AxiosResponse<GenreDTO[]> = await axios.get(urlGenres);
            setGenres(genres.data);
        }
        getGenres();
    }, []);
    return (
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary btn-sm" to='/genres/create'>Create Genre</Link>
            <GenericList list={genres}>
                <table className="table table-responsive table-striped">
                    <thead>
                        <th>Name</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {genres?.map( genre => <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td>
                                <Link to={`/genres/${genre.id}`} className="btn btn-sm btn-warning">Edit</Link>
                                <Button className="btn btn-sm btn-danger">Delete</Button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </GenericList>
        </>
    );
}