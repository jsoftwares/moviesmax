import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./CustomConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

// <T> becos this component will receieve a Generic type from the parent component since we will use it to
// in index page of differenet entities
export default function IndexEntity<T>(props: indexEntityProps<T>){
    const [entities, setEntities] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    useEffect( () => {
        
        loadEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage]);

    const loadEntities = async() => {
        const response: AxiosResponse<T[]> = await axios.get(props.url, {
            params: {page, recordsPerPage}
        });
        const totalAmountOfPages = parseInt(response.headers['totalamountofrecords'], 10);
        setTotalAmountOfPages(Math.ceil(totalAmountOfPages / recordsPerPage));
        setEntities(response.data);
    }

    async function deleteEntity(id:  number){
        try {
            await axios.delete(`${props.url}/${id}`);
            loadEntities();
        } catch (error: any) {
            if (error && error.response) {
                console.error(error.response.data);
                
            }
        }
    }

    const buttons = (editUrl: string, id: number) => <>
        <Link to={`${editUrl}`} className="btn btn-sm btn-warning text-white">Edit</Link>
        <Button 
            className="btn btn-sm btn-danger"
            onClick={ () => customConfirm( () => deleteEntity(id)) }
        >Delete</Button>
    </>
    return (
        <>
            <h3>{props.title}</h3>
            {props.createURL ? 
                <Link className="btn btn-primary btn-sm" to={props.createURL}>Create {props.entityName}</Link> :
                null
            }
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
            <GenericList list={entities}>
                <table className="table table-responsive table-striped">
                    {/* ! - entities  can be undefined but having ! means it would never be undefined */}
                    {props.children(entities!, buttons)}    
                </table>
            </GenericList>
        </>
    );
}

interface  indexEntityProps<T> {
    url: string;
    createURL?: string;
    title: string;
    entityName?: string;
    children(entities:T[], buttons: (editUrl: string, id: number)=> ReactElement ): ReactElement
}