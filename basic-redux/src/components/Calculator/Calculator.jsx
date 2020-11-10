import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
    // Selectors
    selectIsStarted,
    selectLabel,
    selectStateCalculator,
    // Actions
    startAndStop,
    labelNumbers,
    addProcess,
    subtractProcess
 } from '../../features/calculatorSlice'

 import './Calculator.scss'

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
                    onClick={() => {dispatch(labelNumbers({
                        row: rowIndex,
                        cell: cellIndex,
                     }))
                    }}
                >
                    {cellValue}
                </button>
                ))}   
            </div>
            ))}   
        </div>
        ) : null}
        
        
        <button className="Label__radioButton"
            onClick={() => {dispatch(addProcess({}))}} >
                    +
        </button>
            
        {/* <button className="Label__add" onClick={() => dispatch(addProcess(stateCalculator))}>
              +
            </button> */}
            <button className="Label__subtract" onClick={() => dispatch(subtractProcess(stateCalculator))}>
              -
            </button>
            <button className="Label__multiply" onClick={() => dispatch()}>
              x
            </button>
            <button className="Label__divide" onClick={() => dispatch()}>
              /
            </button>
        </nav>

    )
}
