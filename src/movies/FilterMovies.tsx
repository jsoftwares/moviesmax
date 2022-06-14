import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urlGenres, urlMovies } from "../endpoints";
import { GenreDTO } from "../genres/genres.model";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import { movieDTO } from "./movies.model";
import MoviesList from "./MoviesList";

export default function FilterMovies(){
    const initialValues: filterMoviesForm = {
        title: '',
        genreId: 0,
        upcomingReleases: false,
        inTheatres: false,
        page: 1,
        recordsPerPage: 10
    };

    const [genres, setGenres] = useState<GenreDTO[]>([]);
    const [movies, setMovies] = useState<movieDTO[]>([]);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        axios.get(`${urlGenres}/all`)
        .then(response => {
            setGenres(response.data);
        });
    }, [])

    useEffect(() => {
        /**We want to ensure that when d page is refreshed & there were filters, we want to retain those filter
         * in d query string*/

        // We check if title exists in d Query string & if yes we take it then set it as title of initialValues
        // ! - ensure we cast Title to string & not as undefined or null which are other options GET() returns 
        if (query.get('title')) initialValues.title = query.get('title')!;
        if (query.get('genreId')) initialValues.genreId = parseInt(query.get('genreId')!, 10);
        if (query.get('inTheatres')) initialValues.inTheatres = true;
        if (query.get('upcomingReleases')) initialValues.upcomingReleases = true;
        if (query.get('page')) initialValues.page = parseInt(query.get('page')!, 10);
        
        searchMovies(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function searchMovies(values: filterMoviesForm) {
        modifyURL(values);
        axios.get(`${urlMovies}/filter`, { params: values})
        .then((response: AxiosResponse<movieDTO[]>) => {
            const records = parseInt(response.headers['totalamountofrecords'], 10);
            setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
            setMovies(response.data);
        });
    }

    function modifyURL(values: filterMoviesForm) {
        let queryString: string[] = [];
        if (values.title) queryString.push(`title=${values.title}`);
        if (values.genreId !== 0) queryString.push(`genreId=${values.genreId}`);
        if (values.inTheatres) queryString.push(`inTheatres=${values.inTheatres}`);
        if (values.upcomingReleases) queryString.push(`upcomingReleases=${values.upcomingReleases}`);

        queryString.push(`page=${values.page}`);
        navigate(`/movies/filter?${queryString.join('&')}`);
    }

    return (
        <>
            <h3>Filter Movies</h3>
            <Formik initialValues={initialValues}
                onSubmit={ values => {
                    values.page = 1;    //if there's a change in d filtering we want to go back to page 1
                    searchMovies(values);
                } }
            >
                { (formikProps) => (
                    <>
                        <Form>
                            <div className="row gx-3 align-items-center mb-3">

                                {/* In other for Formik to integrate with each form field we use getFieldProps */}
                                <div className="col-auto">
                                    <input type='text' className='form-control' id='title' 
                                        placeholder='Title of movie'
                                        {...formikProps.getFieldProps('title')}
                                    />
                                </div>
                                <div className="col-auto">
                                    <select className="form-select"
                                        {...formikProps.getFieldProps('genreId')}
                                    >
                                        <option value='0'>--Choose a genre--</option>
                                        {genres.map( genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <div className="form-check">
                                        <Field className='form-check-input' id='upcomingReleases' name='upcomingReleases'
                                            type='checkbox' />
                                        <label className="form-check-label" htmlFor="upcomingReleases">
                                            Upcoming Releases
                                        </label>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="form-check">
                                        <Field className='form-check-input' id='inTheatres' name='inTheatres'
                                            type='checkbox' />
                                        <label className="form-check-label" htmlFor="inTheatres">
                                            In Theatres
                                        </label>
                                    </div>
                                </div>
                                <div className="col auto">
                                    {/* Another approach to submit a form other than using button type submit; using formik */}
                                    <Button className='btn btn-primary btn-sm' onClick={ () => formikProps.submitForm()}>
                                        Filter
                                    </Button>
                                    <Button className='btn btn-danger btn-sm ms-3' onClick={ () => {formikProps.
                                        setValues(initialValues);
                                        searchMovies(initialValues);
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>

                            </div>
                        </Form>

                        <MoviesList movies={movies} />
                        <Pagination
                            totalAmountOfPages={totalAmountOfPages}
                            currentPage={formikProps.values.page}
                            onChange={newPage => {
                                formikProps.values.page = newPage;
                                searchMovies(formikProps.values);
                            }}
                        />
                    </>
                )}
            </Formik>
        </>
    );
}

interface filterMoviesForm {
    title: string;
    genreId: number;
    upcomingReleases: boolean;
    inTheatres: boolean;
    page: number;
    recordsPerPage: number;
}