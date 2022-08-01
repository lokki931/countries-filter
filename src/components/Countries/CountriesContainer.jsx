import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from './Countries';

export default function CountriesContainer() {
    const [countries, setCountries] = useState([]);
    const apiEndpoint = 'https://restcountries.com/v3.1/all?fields=name,flags';

    useEffect(() => {
        axios.get(apiEndpoint).then((response) => {
            setCountries(response.data);
        });
    }, []);

    const [value, setValue] = useState('');

    const inputHandler = (e) => {
        setValue(e.target.value);
    };

    let filterCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <>
            <div className="search">
                <input
                    type='text'
                    placeholder="Enter country"
                    value={value}
                    onChange={inputHandler}
                />
            </div>
            <Countries countries={filterCountries} />
        </>
    )
}
