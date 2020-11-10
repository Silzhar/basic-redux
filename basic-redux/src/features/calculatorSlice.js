/* eslint-disable no-lone-blocks */
import { createSlice } from '@reduxjs/toolkit'


export const calculatorSlice = createSlice({
    name: 'calculator',

    initialState: {
        isStarted: false,
        stateCalculator: [],
        stringValue: [],
        parseValue: [],
        newValue: [],
        total: [],
        label: [
            [1, 2, 3 ],
            [4, 5, 6 ],
            [7, 8, 9 ],
            [0 , '=', 'Reset']
          ],

        reset: {
            stringValue: 0,
            parseValue: 0,
            newValue: 0,
            total: 0,
        }
      
    },

    reducers: {
        startAndStop: (state) => {
            state.isStarted = !state.isStarted
            state.stateCalculator.length = 0
        },

        labelNumbers: (state, action) => {
            const { row, cell } = action.payload
            state.stateCalculator.push(state.label[row][cell])
            state.stringValue = state.stateCalculator.join('')

            if (state.label[row][cell] === 'Reset') { 
                state.reset = action.payload
                state.stateCalculator.length = 0
            }     
        },

        addProcess: (state, action) => {
            // const { row, cell } = action.payload
            // state.stateCalculator.push(state.label[row][cell])
            state.stringValue = state.stateCalculator.join('')

            if (state.stateCalculator !== []) {
                state.parseValue.push(parseInt(state.stringValue))
                state.total = state.parseValue + state.newValue

                state.stateCalculator.length = 0
                state.stateCalculator = state.total
                
            } 
            // else if (state.label[row][cell] === '=') {
            //     state.newValue = parseInt(state.stringValue)
            //     state.total = state.parseValue + state.newValue
            //     state.stateCalculator.length = 0
            //     state.stateCalculator = state.total

            //     // Reset states. 
            //     state.reset = action.payload
            // }
            // if (state.label[row][cell] === 'Reset') { 
            //     state.reset = action.payload
            //     state.stateCalculator.length = 0
            // }
        },

        subtractProcess: (state, action) => {
            const { row, cell } = action.payload
            state.stateCalculator.push(state.label[row][cell])
            state.stringValue = state.stateCalculator.join('')

            if (state.label[row][cell] === '-') {
                state.parseValue = parseInt(state.stringValue)
                state.stateCalculator.length = 0
                
            } else if (state.label[row][cell] === '=') {
                state.newValue = parseInt(state.stringValue)
                state.total = state.parseValue - state.newValue
                state.stateCalculator = state.total
                state.stateCalculator.length = 0

                // Reset states. 
                state.reset = action.payload
            }
        }

    }
})

// ACTIONS.
export const { startAndStop, labelNumbers, addProcess, subtractProcess } = calculatorSlice.actions

// Selectors. Trae un valor del estado en forma de variable.
// state : estado de Redux.
export const selectIsStarted = (state) => {
    return state.calculator.isStarted
}

export const selectLabel = (state) => {
    return state.calculator.label
}

export const selectStateCalculator = (state) => state.calculator.stateCalculator

export default calculatorSlice.reducer
