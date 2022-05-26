import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import { GenreDTO } from "./genres.model";
import GenericList from '../utils/GenericList';
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import customConfirm from "../utils/CustomConfirm";

export default function IndexGenres() {
    const [genres, setGenres] = useState<GenreDTO[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    useEffect( () => {
        
        loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage]);

    const loadGenres = async() => {
        const response: AxiosResponse<GenreDTO[]> = await axios.get(urlGenres, {
            params: {page, recordsPerPage}
        });
        const totalAmountOfPages = parseInt(response.headers['totalamountofrecords'], 10);
        setTotalAmountOfPages(Math.ceil(totalAmountOfPages / recordsPerPage));
        setGenres(response.data);
    }

    async function deleteGenre(id:  number){
        try {
            await axios.delete(`${urlGenres}/${id}`);
            loadGenres();
        } catch (error: any) {
            if (error && error.response) {
                console.error(error.response.data);
                
            }
        }
    }
    return (
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary btn-sm" to='/genres/create'>Create Genre</Link>
            <div className="d-flex flex-row mb-2">
                <div className="col-6">
                    <RecordsPerPageSelect onChange={ amountOfrecords =>  {
                        setPage(1) //return to page one
                        setRecordsPerPage(amountOfrecords)
                    }} />
                </div>
                <div className="col-6">
                    <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} 
                        onChange={ newPage => setPage(newPage)}
                    />
                </div>

            </div>
            <GenericList list={genres}>
                <table className="table table-responsive table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres?.map( genre => <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td>
                                <Link to={`/genres/edit/${genre.id}`} className="btn btn-sm btn-warning text-white">Edit</Link>
                                <Button 
                                    className="btn btn-sm btn-danger"
                                    onClick={ () => customConfirm( () => deleteGenre(genre.id)) }
                                >Delete</Button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </GenericList>
        </>
    );
}