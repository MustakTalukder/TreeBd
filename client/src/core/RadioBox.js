import React, { useState } from 'react'


const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0)

 

    const handleChange = (e) => {
        handleFilters(e.target.value)
        setValue(e.target.value)
    }

    return prices.map((p, i) => (
        <div className="radiobox ml-1" key={i} >
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2"
            />

            <label
                className="form-check-label"
            > {p.name} </label>

        </div>
    ))
}


export default RadioBox; 