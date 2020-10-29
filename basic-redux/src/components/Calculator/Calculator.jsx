import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
    // Selectors
    selectIsStarted,
    selectLabel,
    selectStateCalculator,
    // Actions
    startAndStop,
    changeNumber,
    addProcess
 } from '../../features/calculatorSlice'

export function Calculator() {
    const dispatch = useDispatch()

    const isStarted = useSelector(selectIsStarted)
    const label = useSelector(selectLabel)
    const stateCalculator = useSelector(selectStateCalculator)
    
    return (  
        <nav className="Navbar">
        <div>
        <h3>Calculadora</h3>

        <button onClick={() => dispatch(startAndStop())} className="Navbar__playStop">
            {isStarted ?  'STOP' : 'PLAY' }
        </button>
        </div>

        {isStarted ? (
        <div className="Label">
            <p >{stateCalculator}</p>
            {label.map((row, rowIndex) => (
            <div key={rowIndex} className="Label__buttons">
                {row.map((cellValue, cellIndex) => (
                <button
                    className="Label__radioButton"
                    key={rowIndex + cellIndex}
                    onClick={() => {
                        if (stateCalculator !== '0'){
                             dispatch(addProcess({
                                row: rowIndex,
                                cell: cellIndex,
                             }))}
                    //     dispatch(changeNumber({
                    //         row: rowIndex,
                    //         cell: cellIndex,
                    //     })
                    // );
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
