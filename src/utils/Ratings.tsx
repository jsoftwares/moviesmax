import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AuthenticationContext from '../auth/AuthenticationContext';
import './Ratings.css';

export default function Ratings(props: ratingsProps) {
    //array would hold as many element as the number passed to maximumValue props
    const [maximumValueArr, setMaximumValue] = useState<number[]>([]);
    const [selectedValue, setSelectedValue] = useState(props.selectedValue);
    const {claims} = useContext(AuthenticationContext);

    useEffect(() => {
        setMaximumValue(Array(props.maximumValue).fill(0));
        
    },[props.maximumValue]);

    function handleMouseOver(rating: number) {
        setSelectedValue(rating);
    }

    function handleClick(rating: number) {
        const userIsLoggedIn = claims.length > 0;
        if (!userIsLoggedIn) {
            Swal.fire({title: 'Error', text: 'You need to login', icon: 'error'});
            return;
        }
        
        setSelectedValue(rating);
        props.onChange(rating);
    }

  return (
    <>
        {maximumValueArr.map((_, index) => <FontAwesomeIcon 
            onMouseOver={() => handleMouseOver(index+1)} 
            onClick={() => handleClick(index+1)}
            icon='star' key={index} className={`fa-lg pointer ${selectedValue >= index+1 ? 'checked' :null}`}
        />)}
    </>
  )
}

interface ratingsProps {
    maximumValue: number;   //eg 5 will display 5 stars on screen
    selectedValue: number;  //would hold user rating if they have rated this movie
    onChange(rating: number): void; //used to POST/UPDATE user rating
}
