import React, { useState } from 'react';
import heartFilled from '../../svgs/heartFilled.svg';
import heartOutlined from '../../svgs/heartOutlined.svg';

import './Card.css';

const Card = ({ name, phone, email, image, favoured }) => {
    const [isFavoured, setIsFavoured] = useState(favoured);

    const toggleFavoured = () => {
        console.log('Before toggle:', isFavoured);
        setIsFavoured(!isFavoured);
        console.log('After toggle:', isFavoured);
    };

    return (
        <article className='card'>
            <div className='card-header'>
                <img src={image.url} alt={image.alt} className='card-img' />
                <button className='heart' onClick={toggleFavoured}>
                    {isFavoured ? (
                        <img src={heartFilled} alt='filled heart' />
                    ) : (
                        <img src={heartOutlined} alt='outlined heart' />
                    )}
                </button>
            </div>
            <div className='card-contnet'>
                <h3>{name}</h3>
                <p> {phone} </p>
                <p> {email} </p>
            </div>
        </article>
    );
};

export default Card;
