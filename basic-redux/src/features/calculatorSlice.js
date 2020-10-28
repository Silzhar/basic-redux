import { createSlice } from '@reduxjs/toolkit'


export const calculatorSlice = createSlice({
    name: 'calculator',

    initialState: {
        isStarted: false,
        stateCalculator: 0,
        numbers: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
      
    },

    reducers: {
        startAndStop: (state) => {
            state.isStarted = !state.isStarted
        },

        changeNumber: (state, action) => {
            const { row, cell } = action.payload
            state.stateCalculator = state.numbers[row][cell]  
        }
    }
})

// ACTIONS.
export const { startAndStop, changeNumber } = calculatorSlice.actions

// Selectors. Trae un valor del estado en forma de variable.
// state : estado de Redux.
export const selectIsStarted = (state) => {
    return state.calculator.isStarted
}

export const selectNumbers = (state) => {
    return state.calculator.numbers
}

export default calculatorSlice.reducer
