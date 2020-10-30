/* eslint-disable no-lone-blocks */
import { createSlice } from '@reduxjs/toolkit'


export const calculatorSlice = createSlice({
    name: 'calculator',

    initialState: {
        isStarted: false,
        stateCalculator: ' ',
        newValue: '',
        parseValue: 0,
        label: [
            ['1', '2', '3', '+'],
            ['4', '5', '6', '-'],
            ['7', '8', '9', 'x'],
            ['0' , '/', '=']
          ],
      
    },

    reducers: {
        startAndStop: (state) => {
            state.isStarted = !state.isStarted
            state.stateCalculator = ''
        },

        changeNumber: (state, action) => {
            const { row, cell } = action.payload
            state.stateCalculator = state.label[row][cell]  
        },

        addProcess: (state, action) => {
            const { row, cell } = action.payload
            state.newValue = state.stateCalculator + state.label[row][cell]
            state.stateCalculator = state.newValue

            if (state.label[row][cell] === '+'){
                const parseNewValue = parseInt(state.newValue)
                const { row, cell } = action.payload
                state.stateCalculator = state.label[row][cell] 
                const parseStateCalculator = parseInt(state.stateCalculator)

                const sumatory = parseNewValue + parseStateCalculator
                state.parseValue = sumatory
            }
            // eslint-disable-next-line no-unused-expressions
            // { state.label[row][cell] === '+' ? (state.parseValue = parseInt(state.newValue) + parseInt(state.label[row][cell])) : null}
            
        }
    }
})

// ACTIONS.
export const { startAndStop, changeNumber, addProcess } = calculatorSlice.actions

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
