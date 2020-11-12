/* eslint-disable default-case */
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
     
    },

    reducers: {
        startAndStop: (state) => {
            state.isStarted = !state.isStarted
            state.stateCalculator.length = 0
        },

        labelNumbers: (state, action) => {
            const { row, cell } = action.payload
            state.stateCalculator.push(state.label[row][cell])
            
            // ? ¿Mejor con payload? 
            if (state.label[row][cell] === 'Reset') { 
                state.stateCalculator.length = 0
                state.stringValue.length = 0
                state.parseValue = 0
                state.newValue = 0
                state.total.length = 0
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
            state.processToResolve = '-'
            state.stringValue.push(state.stateCalculator.join('')) 
            state.parseValue = parseInt(state.stringValue)
            state.stateCalculator.push(state.total)
            state.stateCalculator.length = 0  
        },

        solveProcess: (state, action) => {
            state.newValue = parseInt(state.stateCalculator.join(''))
            // limpiamos total:[] para no tener elementos en caso de un segundo proceso.
            state.total.length = 0 

            switch (state.isStarted === true) {
                case( state.processToResolve === '+'):
                    state.total.push(state.parseValue + state.newValue)
                    break

                case( state.processToResolve === '-'):
                    state.total.push(state.parseValue - state.newValue)
                    break
            }
            state.stateCalculator.length = 0
            state.stringValue.length = 0
            state.processToResolve = ''
            state.stateCalculator.push(state.total)
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
