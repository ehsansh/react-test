import React from 'react';
import Card from '../Card/Card';
import './Cards.css';

const Cards = ({ cats, setCats }) => {
    const updateFavourites = (index, favoured) => {
        const updatedCats = [...cats];
        updatedCats[index].favoured = favoured;
        setCats(updatedCats);
    };

    return (
        <div className='pet-cards-container'>
            {cats.map((cat, index) => (
                <Card
                    key={cat.id}
                    id={cat.id}
                    name={cat.name}
                    phone={cat.phone}
                    email={cat.email}
                    image={cat.image}
                    favoured={cat.favoured}
                    updateFavourites={updateFavourites}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Cards;
