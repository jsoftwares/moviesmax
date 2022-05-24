import { ReactElement, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { actorMovieDTO } from '../actors/actors.model';

export default function TypeAheadActors(props: typeAheadActorsProps) {

    const actors: actorMovieDTO[] = [
        {id: 1, name: 'Tom Holland', character: '', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg'},
        {id: 2, name: 'Will Smith', character: '', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg/330px-TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg'},
        {id: 3, name: 'Angelina Jolie', character: '', picture:'hhttps://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg/330px-Angelina_Jolie_2_June_2014_%28cropped%29.jpg'}
    ];

    const selelcted: actorMovieDTO[] = [];

    const [draggedElement, setDraggedElement] = useState<actorMovieDTO | undefined>(undefined);
    function handleDragStart(actor: actorMovieDTO) {
        setDraggedElement(actor);
    }
    function handleDragOver(actor: actorMovieDTO){
        if (!draggedElement) {
            return;
        }

        // ensure handleDragOver() is not running if for some reason an actor is dragged over itself
        if (actor.id !== draggedElement.id) {
            const draggedElementIndex = props.actors.findIndex( x => x.id === draggedElement.id);
            const actorIndex = props.actors.findIndex( x => x.id === actor.id); //actor over which another actor is dragged

            const actors = [...props.actors];
            actors[actorIndex] = draggedElement;
            actors[draggedElementIndex] = actor;
            props.onAdd(actors);
        }
    }

    return (
        <div className='mb-3'>
            <label>{props.displayName}</label>
            <Typeahead 
                id="typeahead"
                onChange={ actors => {
                    // if (props.actors.findIndex( x=> x.id === actors[0].id) === -1 ) {
                    //     props.onAdd([...props.actors, actors[0]]);                        
                    // }
                    console.log(actors);
                } }
                options={actors}
                // labelKey= { actor => actor.name }
                labelKey='name'
                filterBy={ ['name']}
                placeholder='Type actor name here...'
                minLength={1}
                flip={true}
                selected={selelcted}
                renderMenuItemChildren={ (actor)=> (
                    <>
                        {/* <img alt='actor' src={ actor.picture}
                            style={ {height: '64px', marginRight: '10px', width: '64px'} }
                        />
                        <span>{actor.name}</span> */}
                    </>
                )}
            />
            <ul className="list-group">
                {actors.map( actor => <li 
                    key={actor.id} 
                    draggable={true}
                    onDragStart={ () => handleDragStart(actor)}
                    onDragOver={ ()=> handleDragOver(actor)}
                    className='list-group-item list-group-item-action'>
                    {actor.name}
                    {props.listUI(actor)}
                    <span className='badge badge-primary badge-pill pointer text-dark'
                        style={{marginLeft: '0.5rem'}}
                        onClick={() =>props.onRemove(actor)}
                    >X</span>
                </li>)}
            </ul>
        </div>
    );
}

interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actor: actorMovieDTO): void;
    listUI(actor: actorMovieDTO): ReactElement;
}