import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from './Countries';
import PaginatioCountriesContainer from './PaginationContainer';

const itemPerPageCounter = 8;

export default function CountriesContainer() {
    const [countries, setCountries] = useState([]);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(itemPerPageCounter);



    const apiEndpoint = 'https://restcountries.com/v3.1/all?fields=name,flags';

    useEffect(() => {
        axios.get(apiEndpoint).then((response) => {
            setIsLoading(false);
            setCountries(response.data);
            console.log(response.data);
            setIsLoading(true);
        }).catch(e => { console.log(e); });
    }, []);

    const inputHandler = (e) => {
        setValue(e.target.value);
        setCurrentPage(1);
        setPerPage(itemPerPageCounter);
    };

    const boxHandler = (e) => {
        setValue(e.target.textContent);
        setIsOpen(!isOpen);
        setCurrentPage(1);
        setPerPage(itemPerPageCounter);
    }
    const inputClick = () => {
        setIsOpen(true);
    }

    let filterCountries = countries.filter(country => {
        return (country.name.common.toLowerCase().includes(value.toLowerCase()))
    })

    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentItems = filterCountries.slice(indexOfFirst, indexOfLast);



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
                    {
                        value && isOpen ?
                            <ul className="search__box">
                                {filterCountries.map((country, index) =>
                                    <li
                                        key={index}
                                        className="search__item"
                                        onClick={boxHandler}
                                    >{country.name.common}</li>
                                )
                                }
                            </ul>
                            : null
                    }
                </form>




            </div>

            {
                isLoading ?
                    <Countries countries={currentItems} /> :
                    <p>loading...</p>
            }
            <PaginatioCountriesContainer
                itemPerPageCounter={itemPerPageCounter}
                filterCountries={filterCountries}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />

        </>
    )
}
