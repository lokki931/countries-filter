import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from './Countries';

export default function CountriesContainer() {
    const [countries, setCountries] = useState([]);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const apiEndpoint = 'https://restcountries.com/v3.1/all?fields=name,flags';

    useEffect(() => {
        axios.get(apiEndpoint).then((response) => {
            setIsLoading(false);
            setCountries(response.data);
            setIsLoading(true);
        });
    }, []);

    const inputHandler = (e) => {
        setValue(e.target.value);
    };

    const boxHandler = (e) => {
        setValue(e.target.textContent);
        setIsOpen(!isOpen);
    }
    const inputClick = () => {
        setIsOpen(true);
    }



    let filterCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <>
            <div className="search">
                <form className="search__form">
                    <input
                        type='text'
                        placeholder="Enter country"
                        className="search__input"
                        value={value}
                        onChange={inputHandler}
                        onClick={inputClick}
                    />
                    <ul className="search__box">
                        {
                            value && isOpen
                                ?
                                filterCountries.map((country, index) =>
                                    <li
                                        key={index}
                                        className="search__item"
                                        onClick={boxHandler}
                                    >{country.name.common}</li>
                                )
                                :
                                null
                        }
                    </ul>
                </form>

            </div>
            {
                isLoading ?
                    <Countries countries={filterCountries} /> :
                    <p>loading...</p>
            }

        </>
    )
}
