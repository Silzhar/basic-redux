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
    subtractProcess,
    solveProcess
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
            <div>
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

                    <button className="Label__radioButton" onClick={() => {dispatch(addProcess(labelNumbers()))}} >
                        +
                    </button>
                    
                    <button className="Label__subtract" onClick={() => dispatch(subtractProcess(labelNumbers()))}>
                    -
                    </button>
                    <button className="Label__multiply" onClick={() => dispatch()}>
                    x
                    </button>
                    <button className="Label__divide" onClick={() => dispatch()}>
                    /
                    </button>
                    <button className="Label__solve" onClick={() => dispatch(solveProcess())}>
                    =
                    </button>
                
                </div>
            </div>     
        ) : null}
        
        
            
        </nav>

    )
}
