/* eslint-disable no-lone-blocks */
import { createSlice } from '@reduxjs/toolkit'


export const calculatorSlice = createSlice({
    name: 'calculator',

    initialState: {
        isStarted: false,
        stateCalculator: [],
        stringValue: [],
        parseValue: 0,
        newValue: 0,
        total: [],
        processToResolve: '',
        label: [
            [1, 2, 3 ],
            [4, 5, 6 ],
            [7, 8, 9 ],
            [0 , 'Reset']
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
            

            if (state.label[row][cell] === 'Reset') { 
                state.reset = action.payload
                state.stateCalculator.length = 0
            }     
        },

        addProcess: (state, action) => {
            state.processToResolve = '+'
            state.stringValue.push(state.stateCalculator.join('')) 
            state.parseValue = parseInt(state.stringValue)
            state.stateCalculator.push(state.total)
            state.stateCalculator.length = 0           
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
        },

        solveProcess: (state, action) => {
            if (state.processToResolve === '+') {
                state.newValue = parseInt(state.stateCalculator.join(''))
                state.total = state.parseValue + state.newValue
                state.stateCalculator.length = 0
                state.processToResolve = ''
                state.stateCalculator = state.total
            }
        },

    }
})

// ACTIONS.
export const { startAndStop, labelNumbers, addProcess, subtractProcess, solveProcess } = calculatorSlice.actions

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
