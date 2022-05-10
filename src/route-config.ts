import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import CreateGenre from "./genres/CreateGenre";
import EditGenres from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";
import LandingPage from "./movies/LandingPage";

const routes = [
    {path: '/genres', component: IndexGenres, exact: true},
    {path: '/genres/create', component: CreateGenre},
    {path: '/genres/edit', component: EditGenres},
    {path: '/actors', component: IndexGenres, exact: true},
    {path: '/actors/create', component: CreateActor},
    {path: '/actors/edit', component: EditActor},
    {path: '/', component: LandingPage, exact: true},
];


export default routes;