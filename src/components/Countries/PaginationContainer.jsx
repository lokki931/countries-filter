import React, { useState } from "react";


export default function PaginatioCountriesContainer({ itemPerPageCounter, filterCountries, setCurrentPage, currentPage, perPage, setPerPage }) {

    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumber] = useState(5);
    const [minPageNumberLimit, setMinPageNumber] = useState(0);

    const pagePaginateHandle = (e) => {
        setCurrentPage(Number(e.target.id));
    }

    const pages = [];

    for (let i = 1; i <= Math.ceil(filterCountries.length / perPage); i++) {
        pages.push(i);
    }



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
        setPerPage(perPage + itemPerPageCounter);
    }

    return (
        <>
            {filterCountries.length > itemPerPageCounter &&
                <>
                    <div className="loadmore">
                        <button onClick={loadMoreHandle} className="loadmore__btn">load more</button>
                    </div>
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

                </>
            }

        </>
    )
}
