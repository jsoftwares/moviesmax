import { Field, Form, Formik } from "formik";
import { GenreDTO } from "../genres/genres.model";
import Button from "../utils/Button";

export default function FilterMovies(){
    const initialValues: filterMoviesForm = {
        title: '',
        genreId: 0,
        upcomingReleases: false,
        inTheatres: false
    };
    const genres: GenreDTO[] = [ {id: 1, name: 'Drama'}, {id: 2, name: 'Comedy'} ]
    return (
        <>
            <h3>Filter Movies</h3>
            <Formik initialValues={initialValues}
                onSubmit={ values => console.log(values) }
            >
                { (formikProps) => (
                    <Form>
                        <div className="row gx-3 align-items-center">

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
                                <Button className='btn btn-danger btn-sm ms-3' onClick={ () => formikProps.setValues(initialValues)} >
                                    Clear
                                </Button>
                            </div>

                        </div>
                    </Form>
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
}