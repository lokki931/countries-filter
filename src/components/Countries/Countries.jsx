import React from 'react'
import Country from './Country/Country';

export default function Countries(props) {
    let countriesLayer = props.countries.map(
        (country, index) =>
            <Country key={index} name={country.name.common} img={country.flags.png} />);
    return (
        <div className="items">
            {countriesLayer}
        </div>
    )
}
