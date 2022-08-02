import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from './Countries';

export default function CountriesContainer() {
    const [countries, setCountries] = useState([]);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(8);

    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumber] = useState(5);
    const [minPageNumberLimit, setMinPageNumber] = useState(0);


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
        setCurrentPage(1);
        setPerPage(8);
    };

    const boxHandler = (e) => {
        setValue(e.target.textContent);
        setIsOpen(!isOpen);
        setCurrentPage(1);
        setPerPage(8);
    }
    const inputClick = () => {
        setIsOpen(true);
    }

    let filterCountries = countries.filter(country => {
        return (country.name.common.toLowerCase().includes(value.toLowerCase()))
    })

    const pagePaginateHandle = (e) => {
        setCurrentPage(Number(e.target.id));
    }

    const pages = [];

    for (let i = 1; i <= Math.ceil(filterCountries.length / perPage); i++) {
        pages.push(i);
    }

    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentItems = filterCountries.slice(indexOfFirst, indexOfLast);




    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={pagePaginateHandle}
                    className={currentPage === number ? "active" : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }

    });

    const nextHandlerBtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumber(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumber(minPageNumberLimit + pageNumberLimit);
        }
    }

    const prevHandlerBtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumber(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumber(minPageNumberLimit - pageNumberLimit);
        }
    }
    let pageIncBtn = null;

    if (pages.length > maxPageNumberLimit) {
        pageIncBtn = <li onClick={nextHandlerBtn}>&hellip;</li>;
    }

    let pageDecBtn = null;

    if (minPageNumberLimit >= 1) {
        pageDecBtn = <li onClick={prevHandlerBtn}>&hellip;</li>;
    }
    const loadMoreHandle = () => {
        setPerPage(perPage + 8);
    }

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
            {
                <>
                    <ul className="pageNumbers">
                        <li>
                            <button
                                onClick={prevHandlerBtn}
                                disabled={currentPage === pages[0] ? true : false}
                            >Prev</button>
                        </li>
                        {pageDecBtn}
                        {renderPageNumbers}
                        {pageIncBtn}
                        <li>
                            <button
                                onClick={nextHandlerBtn}
                                disabled={currentPage === pages[pages.length - 1] ? true : false}
                            >Next</button>
                        </li>

                    </ul>
                    <div className="loadmore">
                        <button onClick={loadMoreHandle} className="loadmore__btn">load more</button>
                    </div>
                </>
            }

        </>
    )
}
