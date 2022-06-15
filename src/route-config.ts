import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import IndexActors from "./actors/IndexActors";
import CreateGenre from "./genres/CreateGenre";
import EditGenres from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import LandingPage from "./movies/LandingPage";
import MovieDetails from "./movies/MovieDetails";
import CreateMovieTheatre from "./movietheatres/CreateMovieTheatre";
import EditMovieTheatre from "./movietheatres/EditMovieTheatre";
import IndexMovieTheatres from "./movietheatres/IndexMovieTheatres";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";

const routes = [
    {path: '/genres', component: IndexGenres, exact: true, isAdmin: true},
    {path: '/genres/create', component: CreateGenre, isAdmin: true},
    {path: '/genres/edit/:id', component: EditGenres, isAdmin: true},    //(\\d+)regex means it must be an integer

    {path: '/actors', component: IndexActors, exact: true, isAdmin: true},
    {path: '/actors/create', component: CreateActor, isAdmin: true},
    {path: '/actors/edit/:id', component: EditActor, isAdmin: true},

    {path: '/movietheatres', component: IndexMovieTheatres, exact: true, isAdmin: true},
    {path: '/movietheatres/create', component: CreateMovieTheatre, isAdmin: true},
    {path: '/movietheatres/edit/:id', component: EditMovieTheatre, isAdmin: true},

    {path: '/movies/create', component: CreateMovie, isAdmin: true},
    {path: '/movies/edit/:id', component: EditMovie, isAdmin: true},
    {path: '/movies/filter', component: FilterMovies},
    {path: '/movies/:id', component: MovieDetails},

    {path: '/', component: LandingPage, exact: true},
    {path: '*', component: RedirectToLandingPage}
];


export default routes;