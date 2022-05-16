import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { actorMovieDTO } from '../actors/actors.model';

export default function TypeAheadActors(props: typeAheadActorsProps) {

    const actors: actorMovieDTO[] = [
        {id: 1, name: 'Tom Holland', character: '', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg'},
        {id: 2, name: 'Will Smith', character: '', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg/330px-TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg'},
        {id: 3, name: 'Angelina Jolie', character: '', picture:'hhttps://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg/330px-Angelina_Jolie_2_June_2014_%28cropped%29.jpg'}
    ]
    return (
        <div className='mb-3'>
            <label>{props.displayName}</label>
            <Typeahead 
                id="typeahead"
                onChange={ actors => {
                    // if (props.actors.findIndex( x=> x.id === actors[0].id) ) {
                        
                    // }
                    console.log(actors);
                } }
                options={actors}
                labelKey='name'
                filterBy={ ['name']}
                placeholder='Type actor name here...'
                minLength={1}
                flip={true}
                // renderMenuItemChildren={ actor => (
                //     <>
                //         <img alt='actor' src={ actor.picture}
                //             style={ {height: '64px', marginRight: '10px', width: '64px'} }
                //         />
                //         <span>{actor.name}</span>
                //     </>
                // )}
            />
        </div>
    );
}

interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    // onAdd(actors: actorMovieDTO[]): void;
}