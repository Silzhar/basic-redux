import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
    // Selectors
    selectIsStarted,
    selectNumbers,
    // Actions
    startAndStop,
    changeNumber
 } from '../../features/calculatorSlice'

export function Calculator() {
    const dispatch = useDispatch()

    const isStarted = useSelector(selectIsStarted)
    const numbers = useSelector(selectNumbers)
    
    return (  
        <nav className="Navbar">
        <div>
        <h3>Calcularora</h3>

        <button onClick={() => dispatch(startAndStop())} className="Navbar__playStop">
            {isStarted ?  'STOP'
            :  'PLAY' }
        </button>
        </div>

        {isStarted ? (
        <div className="Label">
            {numbers.map((row, rowIndex) => (
            <div key={rowIndex} className="Label__buttons">
                {row.map((cellValue, cellIndex) => (
                <button
                    className="Label__radioButton"
                    key={rowIndex + cellIndex}
                    onClick={() => {
                    dispatch(
                        changeNumber({
                        row: rowIndex,
                        cell: cellIndex,
                        })
                    );
                    }}
                >
                    {cellValue}
                </button>
                ))}
            </div>
            ))}
        </div>
        ) : null}
        </nav>

    )
}
