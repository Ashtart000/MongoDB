import React, { useEffect, useState } from 'react';
import { getSalads } from '../../api';
import SaladCard from './SaladCard';
import ClipLoader from "react-spinners/ClipLoader";
import './style.css';

const SaladList = () => {
    const [salads, setSalads] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadSalads = () => {
        getSalads() 
        .then((data) => {
            setSalads(data)
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        loadSalads()
    }, [])

    const renderSalads = () => {
        return salads.map((salad) => <SaladCard
            salad={salad}
            key={salad._id}
            loadSalads={loadSalads}
        />)
    }

    return (
        <>
        <h1>Список салатів:</h1>
        <section className='salad-list-wrapper'>
            {error && <h2>{error.message}</h2>}
            {salads.length > 0 ? renderSalads() : <h2>Салатів немає</h2>}
        </section>
        <ClipLoader
            size={150}
            loading={isLoading}
            cssOverride={{
                display: "block",
                margin: "0 auto",
                borderColor: "red",
              }}
        />
        </>
    );
}

export default SaladList;
