import React from 'react';
import Filter from '../Filter/Filter';
import Cards from '../Cards/Cards';
import './Pets.css';
import cats from '../../mocks/cats.json';
const Pets = () => {
    return (
        <div className='container'>
            <div className='app-container'>
                <Filter />
                <Cards cats={cats} />
            </div>
        </div>
    );
};

export default Pets;
