import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { urlMovies } from "../endpoints";
import coordinateDTO from "../utils/coordinatesDTO.model";
import Loading from "../utils/Loading";
import Map from "../utils/Map";
import { movieDTO } from "./movies.model";

export default function MovieDetails() {

    const [movie, setMovie] = useState<movieDTO>();
    const {id} = useParams();

    useEffect(() => {
        const getMovie = async () => {
            const response: AxiosResponse<movieDTO> = await axios.get(`${urlMovies}/${id}`);
            // format our release date field as a date.
            response.data.releaseDate = new Date(response.data.releaseDate);
            setMovie(response.data);
        }
        getMovie();
    },[id]);

    function transformCoordinates(): coordinateDTO[] {
        if (movie?.inTheatres) {
            const coordinates = movie.movieTheatres.map(movieTheatre => {
                return {lat: movieTheatre.latitude, lng: movieTheatre.longitude, name: movieTheatre.name} as coordinateDTO;
            });
            return coordinates;
        }
        return [];
    }

    function generateEmbededVideoURL(trailer: string): string {
        if (!trailer) return ''; 
        
        let videoId = trailer.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) { //if there is & in d ID ie v=uA5lvKtbK2Y&
            videoId = videoId.substring(0, ampersandPosition);
        }
        
        return `https://www.youtube.com/embed/${videoId}`;
    }


    return (
        movie ? 
            <>
                <h3>{movie.title} ({movie.releaseDate.getFullYear()})</h3>
                {movie.genres?.map(genre => 
                    <Link key={genre.id} style={{marginRight: '5px'}}
                        className='btn btn-primary btn-sm rounded-pill' 
                        to={`/movies/filter?genreId=${genre.id}`}
                    >{genre.name}</Link>)} | {movie.releaseDate.toDateString()}

                    <div style={{ display: 'flex', marginTop: '1rem'}}>
                        <span style={ {display: 'inline-block', marginRight: '1rem'}}>
                            <img src={movie.poster} alt='poster' style={ {width: '225px', height: '315px'} }/>
                        </span>
                        {movie.trailer? <div>
                            <iframe 
                                title='youtube-trailer' 
                                width='560px' 
                                height='315px' 
                                src={generateEmbededVideoURL(movie.trailer)} 
                                frameBorder={0} 
                                allow='accelerometer; autoplay; encrypted-media; gryoscope; picture-in-picture' 
                                allowFullScreen
                            ></iframe>
                        </div> : null}
                    </div>

                    {movie.summary ? <div style={ {marginTop: '1rem'} }>
                        <h3>Summary</h3>
                        <div>
                            <ReactMarkdown>{movie.summary}</ReactMarkdown>
                        </div>
                    </div> : null}

                    {movie.actors && movie.actors.length > 0 ? 
                        <div style={ {marginTop: '1rem'} }>
                            <h3>Actors</h3>
                            <div style={ {display: 'flex', flexDirection: 'column'} }>
                                {movie.actors?.map(actor => 
                                    <div key={actor.id} style={ {marginBottom: '2px'} }>
                                        <img src={actor.picture} alt='pic' style={ {width: '50px', verticalAlign: 'middle'} }/>
                                        <span style={ {display: 'inline-block', 
                                            width: '200px', marginLeft: '1rem'} }>
                                            {actor.name}
                                        </span>
                                        <span style={ {display: 'inline-block', width: '45px'} }>...</span>
                                        <span>{actor.character}</span>
                                    </div>
                                )}
                            </div>
                        </div> : null
                    }

                    {movie.movieTheatres && movie.movieTheatres.length > 0 ? 
                        <div>
                            <h3>Showing on</h3>
                            <Map readOnly={true} coordinates={transformCoordinates()} />
                        </div> : null
                    }
            </> 
            :
            <Loading />
        
    )
}