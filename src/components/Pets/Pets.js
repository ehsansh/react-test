import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '../Filter/Filter';
import Cards from '../Cards/Cards';
import './Pets.css';

const Pets = () => {
    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const [filters, setFilters] = useState({
        gender: 'any',
        favoured: 'any',
    });

    const fetchCats = async () => {
        const response = await axios.get('http://localhost:4000/cats');
        setCats(response.data);
        setFilteredCats(response.data);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    useEffect(() => {
        let catsFiltered = [...cats];
        if (filters.gender !== 'any') {
            catsFiltered = catsFiltered.filter(
                cat => cat.gender === filters.gender
            );
        }
        if (filters.favoured !== 'any') {
            const res = filters.favoured === 'favoured' ? true : false;
            catsFiltered = catsFiltered.filter(cat => cat.favoured === res);
        }
        setFilteredCats(catsFiltered);
    }, [filters]);

    return (
        <div className='container'>
            <div className='app-container'>
                <Filter filters={filters} setFilters={setFilters} />
                <Cards cats={filteredCats} setCats={setCats} />
            </div>
        </div>
    );
};

export default Pets;
